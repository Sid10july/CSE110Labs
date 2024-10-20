// src/toDoList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("ToDoList Component", () => {
  
  // Test: Reads all items in the to-do list
  test("reads all to-do list items", () => {
    render(<ToDoList />);

    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bananas")).toBeInTheDocument();
  });

  // Test: Updates the number of checked items
  test("updates the number of checked items", () => {
    render(<ToDoList />);

    const applesCheckbox = screen.getByLabelText("Apples");
    const bananasCheckbox = screen.getByLabelText("Bananas");

    fireEvent.click(applesCheckbox);
    fireEvent.click(bananasCheckbox);

    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();
  });
});