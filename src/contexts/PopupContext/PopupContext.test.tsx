import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import {
  PopupActionTypes,
  PopupContext,
  PopupProvider,
} from "./usePopupContext";

describe("PopupContext", () => {
  let component: RenderResult;

  beforeEach(() => {
    //arrange
    component = render(
      <PopupProvider>
        <PopupContext.Consumer>
          {(value) => (
            <>
              <span data-testid="message">
                Popup message:{" "}
                {value?.state.popup.message === ""
                  ? "empty"
                  : value?.state.popup.message}
              </span>
              <button
                data-testid="create-popup"
                onClick={() =>
                  value?.dispatch({
                    type: PopupActionTypes.CREATE_POPUP,
                    popup: {
                      type: "success",
                      message: "test popup created successfully!",
                    },
                  })
                }
              >
                Create test Popup
              </button>
              <button
                data-testid="delete-popup"
                onClick={() =>
                  value?.dispatch({
                    type: PopupActionTypes.DELETE_POPUP
                  })
                }
              >
                Delete test Popup
              </button>
            </>
          )}
        </PopupContext.Consumer>
      </PopupProvider>
    );
  });

  it("popup should have empty message initially", () => {
    //act
    const { getByTestId } = component;
    const popupMessage = getByTestId("message");

    //assert
    expect(popupMessage).toHaveTextContent("Popup message: empty");
  });

  it("popup should display proper message after creating a popup", () => {
    //arrange
    const { getByTestId } = component;
    const popupMessage = getByTestId("message");
    const createPopupBtn = getByTestId("create-popup");

    //act
    fireEvent.click(createPopupBtn);

    //assert
    expect(popupMessage).toHaveTextContent("test popup created successfully!");
  });

  it("popup message should be empty again after deleting popup", () => {
    //arrange
    const { getByTestId } = component;
    const popupMessage = getByTestId("message");
    const createPopupBtn = getByTestId("create-popup");
    const deletePopupBtn = getByTestId("delete-popup");

    //act
    fireEvent.click(createPopupBtn);
    fireEvent.click(deletePopupBtn);

    //assert
    expect(popupMessage).toHaveTextContent("Popup message: empty");
  });
});
