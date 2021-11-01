import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

export enum PopupActionTypes {
  CREATE_POPUP = "CREATE_POPUP",
  DELETE_POPUP = "DELETE_POPUP",
}

type CreatePopup = {
  type: PopupActionTypes.CREATE_POPUP;
  popup: {
    type: "warning" | "success" | "reminder";
    message?: string;
    confirmFn?: () => void;
  };
};

type DeletePopup = {
  type: PopupActionTypes.DELETE_POPUP;
};

type Action = CreatePopup | DeletePopup;

type State = {
  popup: {
    type: "warning" | "success" | "reminder";
    message?: string;
    confirmFn?: () => void;
  };
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  popup: {
    type: "warning"
  },
};

const PopupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case PopupActionTypes.CREATE_POPUP:
      return {
        ...state,
        popup: action.popup,
      };
    case PopupActionTypes.DELETE_POPUP:
      return {
        ...state,
        popup: initialState.popup,
      };
    default:
      throw new Error("No action of this type exists!");
  }
};

export const PopupContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const PopupProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = React.useReducer(PopupReducer, initialState);
  const value = { state, dispatch };

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};

export const usePopupContext = () => {
  const context = React.useContext(PopupContext);
  if (context === undefined) {
    throw new Error("No value provided for context!");
  }
  return context;
};
