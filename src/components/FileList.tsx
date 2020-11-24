import React, { Component } from "react";
import { ws } from "..";
import { Message } from "./ChatText";
import ax from "axios";

export type File = {
    id: string;
    fileName: string;
};

type Props = {};
type State = {
    files: File[];
};

export class FileList extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            files: [],
        };

        this.incoming = this.incoming.bind(this);
    }

    async componentDidMount() {
        const res = await ax.get(
            "http://" + process.env.REACT_APP_API_URL + "/file"
        );
        this.setState({
            files: res.data.reverse(),
        });

        ws.onmessage = this.incoming;
    }

    async incoming(event: any) {
        const blob: Blob = event.data;
        let message: Message;

        try {
            message = JSON.parse(await blob.text());
        } catch (err) {
            console.error(err);
            return;
        }

        switch (message.type) {
            case "file":
                const files = this.state.files;
                files.unshift(message.file);

                if (files.length > 20) {
                    files.pop();
                }

                this.setState({ files });
                break;
        }
    }

    render() {
        return (
            <div>
                <h2 className="title">Files</h2>
                <ul>
                    {this.state.files.map((file: File) => (
                        <li key={file.id}>
                            <a
                                target="__blank"
                                href={
                                    "http://" +
                                    process.env.REACT_APP_API_URL +
                                    "/file/" +
                                    file.id
                                }
                            >
                                {file.fileName}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
