import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { TodoActionTypes, TodoContext, TodoProvider } from "./useTodoContext";

describe("TodoContext", () => {
  it("todolist should be empty initially", () => {
    //arrange
    const mockComponent = render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => (
            <span data-testid="todo-length">
              Items in list: {value?.state.todos.length}
            </span>
          )}
        </TodoContext.Consumer>
      </TodoProvider>
    );
    const { getByTestId } = mockComponent;

    //act
    const TodosLengthText = getByTestId("todo-length");

    //assert
    expect(TodosLengthText).toHaveTextContent("Items in list: 0");
  });

  it("items should be added to todolist properly", () => {
    //arrange
    const mockComponent = render(
      <TodoProvider>
        <TodoContext.Consumer>
          {(value) => (
            <>
              <span data-testid="todo-length">
                Items in list: {value?.state.todos.length}
              </span>
              <button
                data-testid="add-todo-btn"
                onClick={() =>
                  value?.dispatch({
                    type: TodoActionTypes.ADD_TODO,
                    task: "Sample task",
                    backgroundColor: "#fff",
                    borderColor: "#000",
                  })
                }
              >
                Add Todo
              </button>
            </>
          )}
        </TodoContext.Consumer>
      </TodoProvider>
    );
    const { getByTestId } = mockComponent;

    //act
    const TodosLengthText = getByTestId("todo-length");
    const AddTodoBtn = getByTestId("add-todo-btn");

    //assert

    //empty list before adding items
    expect(TodosLengthText).toHaveTextContent("Items in list: 0");

    //adding an item
    fireEvent.click(AddTodoBtn);

    //list should have one item after adding item
    expect(TodosLengthText).toHaveTextContent("Items in list: 1");
  });
});
