import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PopupProvider } from "./contexts/PopupContext/usePopupContext";
import { TodoProvider } from "./contexts/TodoContext/useTodoContext";

ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </TodoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
