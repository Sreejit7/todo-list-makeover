import React from "react";
import "./App.css";
import Popup from "./components/Popup";
import { usePopupContext } from "./contexts/PopupContext/usePopupContext";
import { TodoProvider } from "./contexts/TodoContext/useTodoContext";
import Todos from "./pages/Todos";

function App() {
  const {
    state: {
      popup: { message },
    },
  } = usePopupContext();
  return (
    <>
      {message !== "" && <Popup />}
      <TodoProvider>
        <Todos />
      </TodoProvider>
    </>
  );
}

export default App;
