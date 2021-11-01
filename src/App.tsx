import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import Popup from "./components/Popup";
import ReminderPopup from "./components/Popup/ReminderPopup";
import { usePopupContext } from "./contexts/PopupContext/usePopupContext";

import Todos from "./pages/Todos";

function App() {
  const {
    state: {
      popup: { type, message },
    },
  } = usePopupContext();

  return (
    <>
      {message && message !== "" && <Popup />}
      {type === "reminder" && <ReminderPopup />}
      <Layout cName="flex column align-center">
        <Todos />
      </Layout>
    </>
  );
}

export default App;
