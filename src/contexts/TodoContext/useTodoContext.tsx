import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};
export enum TodoActionTypes {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  COMPLETE_TODO = "COMPLETE_TODO",
  SET_REMINDER_ID = "SET_REMINDER_ID",
}
type AddTodo = {
  type: TodoActionTypes.ADD_TODO;
  task: string;
  backgroundColor: string;
  borderColor: string;
};
type DeleteTodo = {
  type: TodoActionTypes.DELETE_TODO;
  id: number;
};
type CompleteTodo = {
  type: TodoActionTypes.COMPLETE_TODO;
  id: number;
};
type SetReminderTodo = {
  type: TodoActionTypes.SET_REMINDER_ID;
  id: number;
};
type Action = AddTodo | DeleteTodo | CompleteTodo | SetReminderTodo;

type Todo = {
  id: number;
  task: string;
  backgroundColor: string;
  borderColor: string;
  completed: boolean;
};
export type State = {
  todos: Todo[];
  reminderId?: number;
};
export type Dispatch = (action: Action) => void;

const initialState: State = {
  todos: [],
};

const TodoReducer = (state: State = initialState, action: Action): State => {
  let id = state.todos.length;

  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      id++;
      const { task, backgroundColor, borderColor } = action;
      return {
        ...state,
        todos: [
          ...state.todos,
          { id, task, backgroundColor, borderColor, completed: false },
        ],
      };
    case TodoActionTypes.DELETE_TODO:
      let updatedTodos = [...state.todos];
      const index = updatedTodos.findIndex((todo) => todo.id === action.id);
      updatedTodos.splice(index, 1);
      return {
        ...state,
        todos: updatedTodos,
      };
    case TodoActionTypes.COMPLETE_TODO:
      let updatedCompleteTodos = [...state.todos];
      const completedIndex = updatedCompleteTodos.findIndex(
        (todo) => todo.id === action.id
      );
      const completedTodo = {
        ...updatedCompleteTodos[completedIndex],
        completed: true,
      };
      updatedCompleteTodos[completedIndex] = completedTodo;
      return {
        ...state,
        todos: updatedCompleteTodos,
      };
    case TodoActionTypes.SET_REMINDER_ID:
      return {
        ...state,
        reminderId: action.id,
      };
    default:
      throw new Error("No action of this type exists!");
  }
};

export const TodoContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const TodoProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = React.useReducer(TodoReducer, initialState);

  const value = { state, dispatch };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error("No value provided for context!");
  }
  return context;
};
