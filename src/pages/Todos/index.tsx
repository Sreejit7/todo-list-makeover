import styles from "./todos.module.css";
import { useState } from "react";
import TodoList from "../../components/TodoList";
import {
  TodoActionTypes,
  useTodoContext,
} from "../../contexts/TodoContext/useTodoContext";
import { colors } from "../../data/TodoItemColors";
import { generateColorCode } from "../../helpers/generateColorCode";

const Todos = () => {
  const [todoInput, setTodoInput] = useState("");
  const [emptyTodo, setEmptyTodo] = useState(false);
  const [todosType, setTodosType] = useState<"current" | "completed">(
    "current"
  );

  const {
    state: { todos },
    dispatch,
  } = useTodoContext();

  const addTodo = () => {
    const { backgroundColor, borderColor } = generateColorCode(colors);
    dispatch({
      type: TodoActionTypes.ADD_TODO,
      task: todoInput,
      backgroundColor,
      borderColor,
    });

    setTodoInput("");
  };
  return (
    <main className={`page ${styles.todos}`}>
      <header className={styles["todos-header"]}>
        <h1 className={styles["todos-header-title"]}>
          To plan is to progress.
        </h1>
        <span className={styles["todos-header-text"]}>
          Start planning your day, tick off tasks and get going. 🚀
        </span>
      </header>
      {todos.filter(({ completed }) => !completed).length < 5 ? (
        <section className={styles["todos-input"]}>
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
        </section>
      ) : (
        <section className={styles["todos-input"]}>
          <h3>Tick off one or more tasks to add more to-dos!</h3>
          <span>
            You can add maximum 5 to-dos at once because long lists don't
            generally get done!
          </span>
        </section>
      )}
      <h2>All Your Todos</h2>
      <>
        <span className="flex align-center">
          <button
            onClick={() => setTodosType("current")}
            className={`btn tab-btn ${
              todosType === "current" && "tab-btn-active"
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setTodosType("completed")}
            className={`btn tab-btn ${
              todosType === "completed" && "tab-btn-active"
            }`}
          >
            Completed
          </button>
        </span>
        {todosType === "current" ? (
          <TodoList type="current" />
        ) : (
          <TodoList type="completed" />
        )}
      </>
    </main>
  );
};

export default Todos;
