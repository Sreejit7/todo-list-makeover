import {
  TodoActionTypes,
  useTodoContext,
} from "../../contexts/TodoContext/useTodoContext";
import styles from "./todoitem.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
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
const TodoItem = ({ task, id, bgColor, borderColor }: TodoProps) => {
  const { dispatch } = useTodoContext();
  const { dispatch: popupDispatch } = usePopupContext();
  const [done, setDone] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);

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

  return (
    <section className={styles.container}>
      <article
        className={`${styles.todoitem} ${done && styles.done}`}
        style={{ backgroundColor: bgColor, border: `2px solid ${borderColor}` }}
      >
        {task}
        <nav className={styles.buttons}>
          <button
            onClick={() => {
              setDone(true);
              setDisplayMessage(true);
              setTimeout(() => {
                setDisplayMessage(false);
              }, 3000);
            }}
            className={styles.delete}
            style={{ backgroundColor: borderColor }}
          >
            <IoMdDoneAll />
          </button>
          <button
            onClick={done ? deleteTodo : deleteConfirmPopup}
            className={styles.delete}
            style={{ backgroundColor: borderColor }}
          >
            <RiDeleteBinLine />
          </button>
        </nav>
      </article>
      {displayMessage && (
        <span className={styles.message}>Great job! You did it!</span>
      )}
    </section>
  );
};

export default TodoItem;
