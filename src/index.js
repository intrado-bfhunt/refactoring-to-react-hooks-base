import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import { makeServer } from "@mocks";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
