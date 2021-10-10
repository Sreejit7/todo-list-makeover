import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};
export enum TodoActionTypes {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
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
type Action = AddTodo | DeleteTodo;

type Todo = {
  id: number;
  task: string;
  backgroundColor: string;
  borderColor: string;
};
export type State = {
  todos: Todo[];
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
        todos: [...state.todos, { id, task, backgroundColor, borderColor }],
      };
    case TodoActionTypes.DELETE_TODO:
      let updatedTodos = [...state.todos];
      const index = updatedTodos.findIndex((todo) => todo.id === action.id);
      updatedTodos.splice(index, 1);
      return {
        ...state,
        todos: updatedTodos,
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
