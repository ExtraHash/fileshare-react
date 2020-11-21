import React, { Component } from "react";
import ax from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faUpload } from "@fortawesome/free-solid-svg-icons";

type Props = {};
type State = {};

export class FileUploader extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    async fileHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files;
        if (fileList) {
            const formData = new FormData();

            for (let i = 0; i < fileList.length; i++) {
                formData.append("file", fileList[i], fileList[i].name);
            }

            await ax.post("http://10.0.0.148:10188/file", formData);
        }
    }

    render() {
        return (
            <div className="file is-boxed">
                <label className="file-label">
                    <input
                        className="file-input"
                        type="file"
                        name="file"
                        onChange={this.fileHandler}
                    />
                    <span className="file-cta">
                        <span className="file-icon">
                            <FontAwesomeIcon icon={faUpload} />
                        </span>
                        <span className="file-label">Choose a file…</span>
                    </span>
                </label>
            </div>
        );
    }
}
