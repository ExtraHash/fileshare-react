import React, { Component } from "react";
import { ws } from "..";
import ax from "axios"

type File = {
    id: string;
    fileName: string;
}

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
        const res = await ax.get("http://localhost:10188/file")
        this.setState({
            files: res.data.reverse(),
        })

        ws.onmessage = this.incoming;
    }

    async incoming(message: any) {
        const blob: Blob = message.data;
        const file: File = JSON.parse(await blob.text());

        const files = this.state.files;
        files.unshift(file)

        if (files.length > 20) {
            files.pop();
        }

        this.setState({ files })
      }

    render() {
        return (
            <div>
                <h2 className="title">Last 10 Files</h2>
                <ul>
                    {this.state.files.map((file: File) => (
                        <li key={file.id}><a href={"http://localhost:10188/file/"+file.id}>{file.fileName}</a></li>
                    ))}
                </ul>
            </div>
        )
    }
}