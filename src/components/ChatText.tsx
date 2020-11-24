import React, { Component } from "react";
import { ws } from "..";
import { File } from "./FileList";
import { v4 as uuidv4 } from "uuid";

type Props = {};
type State = {
    messages: Message[];
    input: string;
    username: string;
};

export type Message = {
    type: string;
    id: string;
    text: any;
    file: File;
    time: string;
    username: string;
};

export class ChatText extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            messages: [],
            input: "",
            username: "Anonymous",
        };

        this.incoming = this.incoming.bind(this);
    }

    async componentDidMount() {
        ws.onmessage = this.incoming;
    }

    async incoming(message: any) {
        const blob: Blob = message.data;
        let msg: Message;

        const data = await blob.text();
        console.log();

        try {
            msg = JSON.parse(data);
            console.log(msg);
            switch (msg.type) {
                case "message":
                    const messages = this.state.messages;
                    messages.push(msg);
                    this.setState({
                        messages,
                    });
                    break;
            }
        } catch (err) {
            console.error(err);
            return;
        }
    }

    render() {
        return (
            <div>
                <div className="message-box box-wrapper">
                    {this.state.messages.map((msg) => (
                        <article key={msg.id} className="media">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                                </p>
                            </figure>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{msg.username}</strong>{" "}
                                        <small>
                                            {new Date(
                                                msg.time
                                            ).toLocaleTimeString()}
                                        </small>
                                        <br />
                                        {msg.text}
                                    </p>
                                </div>
                            </div>
                            <div className="media-right"></div>
                        </article>
                    ))}
                </div>
                <div className="chat-box">
                    <div className="container box-wrapper">
                        <textarea
                            className="textarea"
                            value={this.state.input}
                            onChange={(event) => {
                                this.setState({
                                    input: event.target.value,
                                });
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();

                                    if (this.state.input.trim() === "") {
                                        return;
                                    }
                                    ws.send(
                                        JSON.stringify({
                                            type: "message",
                                            text: this.state.input,
                                            id: uuidv4(),
                                            username: this.state.username,
                                        })
                                    );
                                    this.setState({
                                        input: "",
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
