import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WebSocket from "isomorphic-ws";
import "./styles/style.scss";

export const ws = new WebSocket(
    "ws://" + process.env.REACT_APP_API_URL + "/socket"
);

ws.onopen = function open() {
    console.log("connected");
};
ws.onclose = function close() {
    console.log("closed");
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
