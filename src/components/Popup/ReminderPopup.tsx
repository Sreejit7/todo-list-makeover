import styles from "./popup.module.css";
import { IoMdClose } from "react-icons/io";
import {
  PopupActionTypes,
  usePopupContext,
} from "../../contexts/PopupContext/usePopupContext";
import { useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useTodoContext } from "../../contexts/TodoContext/useTodoContext";

const ReminderPopup = () => {
  const {
    state: {
      popup: { type },
    },
    dispatch,
  } = usePopupContext();

  const {
    state: { todos, reminderId },
  } = useTodoContext();

  const { showNotification, closeNotification } = useNotification();

  const [reminderTime, setReminderTime] = useState(5);

  const decreaseTime = () => {
    if (reminderTime > 5) {
      setReminderTime(reminderTime - 5);
    }
  };

  const increaseTime = () => {
    if (reminderTime < 30) {
      setReminderTime(reminderTime + 5);
    }
  };

  const confirmReminder = () => {
    const reminderTask = todos.find(({ id }) => id === reminderId)?.task;
    setTimeout(
      () =>
        showNotification({
          title: `Time for ${reminderTask ? reminderTask : "your next task!"}`,
          message:
            "The best time to perform this task is NOW, so let's get started!",
        }),
      reminderTime * 60000
    );
    setTimeout(closeNotification, reminderTime * 60000 + 10);
    dispatch({
      type: PopupActionTypes.DELETE_POPUP,
    });
  };
  return (
    <div className={styles["popup-container"]}>
      <article className={`${styles.popup} ${styles.reminder}`}>
        <h3>Remind for this To-do in:</h3>
        <span className={styles["input-section"]}>
          <button className={`btn-symbol ${styles.btn}`} onClick={decreaseTime}>
            -
          </button>
          <span className={styles["input-txt"]}>
            <input
              type="number"
              className={styles["input"]}
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.valueAsNumber)}
            />
            <p>Minutes</p>
          </span>
          <button className={`btn-symbol ${styles.btn}`} onClick={increaseTime}>
            +
          </button>
        </span>
        <IoMdClose
          className={`${styles["close-btn"]} ${styles[`close-btn-${type}`]}`}
          onClick={() =>
            dispatch({
              type: PopupActionTypes.DELETE_POPUP,
            })
          }
        />
        <footer className={styles["reminder-footer"]}>
          <button className="btn btn-primary" onClick={() => confirmReminder()}>
            Confirm
          </button>
        </footer>
      </article>
    </div>
  );
};

export default ReminderPopup;
