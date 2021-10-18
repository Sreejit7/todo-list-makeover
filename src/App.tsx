import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Popup from "./components/Popup";
import { usePopupContext } from "./contexts/PopupContext/usePopupContext";
import { TodoProvider } from "./contexts/TodoContext/useTodoContext";
import { useNotification } from "./hooks/useNotification";
import Todos from "./pages/Todos";

function App() {
  const {
    state: {
      popup: { message },
    },
  } = usePopupContext();

  useEffect(() => {
    if(permission === "default"){
      askForPermission();
    }
  },[]);

  const { askForPermission, permission, showNotification } = useNotification();
  return (
    <>
      {message !== "" && <Popup />}
      <TodoProvider>
        <Layout cName="flex column align-center">
          <Todos />
        </Layout>
      </TodoProvider>
    </>
  );
}

export default App;
