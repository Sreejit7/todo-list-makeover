import {
  TodoActionTypes,
  useTodoContext,
} from "../../contexts/TodoContext/useTodoContext";
import styles from "./todoitem.module.css";
import { RiDeleteBinLine, RiAlarmLine } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { useState } from "react";
import {
  PopupActionTypes,
  usePopupContext,
} from "../../contexts/PopupContext/usePopupContext";

type TodoProps = {
  task: string;
  id: number;
  bgColor: string;
  borderColor: string;
};

type MessageState = {
  showMessage: boolean;
  message?: string;
};

const TodoItem = ({ task, id, bgColor, borderColor }: TodoProps) => {
  const { dispatch } = useTodoContext();
  const { dispatch: popupDispatch } = usePopupContext();
  const [done, setDone] = useState(false);
  const [displayMessage, setDisplayMessage] = useState<MessageState>({
    showMessage: false,
  });

  const deleteTodo = () => {
    dispatch({
      type: TodoActionTypes.DELETE_TODO,
      id,
    });
  };

  const confirmDelete = () => {
    deleteTodo();
    popupDispatch({
      type: PopupActionTypes.DELETE_POPUP,
    });
  };

  const deleteConfirmPopup = () => {
    popupDispatch({
      type: PopupActionTypes.CREATE_POPUP,
      popup: {
        type: "warning",
        message: "Delete this todo without completing it?",
        confirmFn: confirmDelete,
      },
    });
  };

  const setReminderConfirm = () => {
    setDisplayMessage({
      showMessage: true,
      message: "Reminder set for this todo!",
    });
    setTimeout(() => {
      setDisplayMessage({ showMessage: false });
    }, 3000);
  };

  return (
    <section className={styles.container}>
      <article
        className={`${styles.todoitem} ${done && styles.done}`}
        style={{ backgroundColor: bgColor, border: `2px solid ${borderColor}` }}
      >
        {task}
        <nav className={styles.buttons}>
          <button
            title="Mark as Done"
            onClick={() => {
              setDone(true);
              setDisplayMessage({
                showMessage: true,
                message: "Great job! You did it!",
              });
              setTimeout(() => {
                setDisplayMessage({
                  showMessage: false,
                });
              }, 3000);
            }}
            className={styles.delete}
            style={{ backgroundColor: borderColor }}
          >
            <IoMdDoneAll />
          </button>
          <button
            title="Delete"
            onClick={done ? deleteTodo : deleteConfirmPopup}
            className={styles.delete}
            style={{ backgroundColor: borderColor }}
          >
            <RiDeleteBinLine />
          </button>
          <button
            title="Put a Reminder"
            onClick={() => {
              popupDispatch({
                type: PopupActionTypes.CREATE_POPUP,
                popup: {
                  type: "reminder",
                  confirmFn: setReminderConfirm,
                },
              });
              dispatch({
                type: TodoActionTypes.SET_REMINDER_ID,
                id,
              });
            }}
            className={styles.delete}
            style={{ backgroundColor: borderColor }}
            disabled={done}
          >
            <RiAlarmLine />
          </button>
        </nav>
      </article>
      {displayMessage.showMessage && (
        <span className={styles.message}>{displayMessage.message}</span>
      )}
    </section>
  );
};

export default TodoItem;
