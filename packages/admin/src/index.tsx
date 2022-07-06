import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
