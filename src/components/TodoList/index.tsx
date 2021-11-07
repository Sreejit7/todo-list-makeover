import styles from "./todolist.module.css";
import { useTodoContext } from "../../contexts/TodoContext/useTodoContext";
import TodoItem from "../TodoItem";
import { useRef } from "react";

type Props = {
  type: "current" | "completed";
};
const TodoList = ({ type }: Props) => {
  const {
    state: { todos },
  } = useTodoContext();
  const todolistRef = useRef<HTMLUListElement>(null);
  console.log(todolistRef.current);
  return (
    <>
      <ul ref={todolistRef} className={styles.todolist}>
        {todos
          .filter(({ completed }) =>
            type === "completed" ? completed : !completed
          )
          .map(({ task, id, borderColor, backgroundColor }) => (
            <TodoItem
              key={id}
              id={id}
              bgColor={backgroundColor}
              borderColor={borderColor}
              task={task}
              completed={type === "completed"}
            />
          ))}
      </ul>
      {todos.filter(({ completed }) =>
        type === "completed" ? completed : !completed
      ).length === 0 && (
        <span>
          {type === "completed"
            ? "Tick off some tasks, keep going!"
            : "Let's plan your day, add some todos!"}
        </span>
      )}
    </>
  );
};

export default TodoList;
