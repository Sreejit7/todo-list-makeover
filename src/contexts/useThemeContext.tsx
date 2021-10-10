import React, { ReactElement, useContext, useReducer } from "react";
import { themes } from "../data/Themes";

type ChildrenProps = {
  children: ReactElement[];
};
type Action = { type: "light" } | { type: "dark" };
type State = {
  theme: {
    foreground: string;
    background: string;
  };
};
type Dispatch = (action: Action) => void;

const initialState = {
  theme: themes.light,
};

const themeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "light":
      return {
        ...state,
        theme: themes.light,
      };
    case "dark":
      return {
        ...state,
        theme: themes.dark,
      };
    default:
      throw new Error(`Unhandled action: No action of type exists`);
  }
};

const ThemeContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const ThemeProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const value = { state, dispatch };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("No value provided for theme context!");
  }
  return context;
};
