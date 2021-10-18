import styles from "./todos.module.css";
import { useState } from "react";
import TodoList from "../../components/TodoList";
import {
  TodoActionTypes,
  useTodoContext,
} from "../../contexts/TodoContext/useTodoContext";
import { colors } from "../../data/TodoItemColors";
import { generateColorCode } from "../../helpers/generateColorCode";
import { useNotification } from "../../hooks/useNotification";

const Todos = () => {
  const [todoInput, setTodoInput] = useState("");
  const [emptyTodo, setEmptyTodo] = useState(false);
  const {
    state: { todos },
    dispatch,
  } = useTodoContext();

  const { showNotification, closeNotification } = useNotification();

  const addTodo = () => {
    const { backgroundColor, borderColor } = generateColorCode(colors);
    dispatch({
      type: TodoActionTypes.ADD_TODO,
      task: todoInput,
      backgroundColor,
      borderColor,
    });
    showNotification({
      title: "New todo created!",
      message: `You just created a new todo for ${todoInput}`
    });

    setTodoInput("");
    setTimeout(closeNotification, 2500);
  };
  return (
    <main className={`page ${styles.todos}`}>
      <header className={styles["todos-header"]}>
        <h1 className={styles["todos-header-title"]}>To plan is to progress.</h1>
        <span className={styles["todos-header-text"]}>
          Start planning your day, tick off tasks and get going. 🚀
        </span>
      </header>
      <h3>Add a new todo</h3>
      <section className={styles["input-section"]}>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onFocus={() => setEmptyTodo(false)}
          onBlur={
            todoInput === ""
              ? () => setEmptyTodo(true)
              : () => setEmptyTodo(false)
          }
          className={`${styles.input} ${emptyTodo && styles["empty"]}`}
          placeholder="Type something on your list today  "
        />
        <button
          className="btn btn-primary"
          disabled={todoInput === ""}
          onClick={addTodo}
        >
          {emptyTodo ? "Can't add empty todo!" : "Add Todo"}
        </button>
      </section>
      <h2>All Your Todos</h2>
      {todos.length === 0 ? (
        <h3>Let's plan your day, add some todos!</h3>
      ) : (
        <TodoList />
      )}
    </main>
  );
};

export default Todos;
