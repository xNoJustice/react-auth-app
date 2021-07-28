import React from "react";
import ReactDOM from "react-dom";
import "./styles/output.css";
import App from "./App";

ReactDOM.render(
  <div className="bg-gray-300 dark:bg-gray-900 w-full h-screen flex justify-center items-center font-sans">
    <App />
  </div>,
  document.getElementById("root")
);
