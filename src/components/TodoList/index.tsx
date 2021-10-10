import styles from "./todolist.module.css";
import { useTodoContext } from "../../contexts/TodoContext/useTodoContext";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const {
    state: { todos },
  } = useTodoContext();
  return (
    <ul className={styles.todolist}>
      {todos.map(({ task, id, borderColor, backgroundColor }) => (
        <TodoItem
          key={id}
          id={id}
          bgColor={backgroundColor}
          borderColor={borderColor}
          task={task}
        />
      ))}
    </ul>
  );
};

export default TodoList;
