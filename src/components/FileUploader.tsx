import React, { Component } from "react";
import ax from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

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

            let totalSize = 0;
            for (let i = 0; i < fileList.length; i++) {
                formData.append("file", fileList[i], fileList[i].name);
                totalSize += fileList[i].size;
            }
            if (totalSize > 1048576) {
                console.warn("File is too big.");
                return;
            }

            await ax.post(
                "http://" + process.env.REACT_APP_API_URL + "/file",
                formData
            );
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
