import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContainer } from "./ts/AuthContainer";

ReactDOM.render(
  <AuthContainer>
    <App />
  </AuthContainer>,
  document.getElementById("root")
);
