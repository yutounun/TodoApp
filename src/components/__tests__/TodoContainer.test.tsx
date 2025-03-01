import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TodoContainer from "../TodoContainer";
import * as hooks from "../../hooks/useTodos";

vi.mock("../../hooks/useTodos", () => ({
  useTodos: vi.fn(),
}));

describe("TodoContainer", () => {
  const mockTodos = [
    { id: 1, label: "Test Todo 1", completed: false },
    { id: 2, label: "Test Todo 2", completed: true },
  ];

  const mockUseTodos = {
    todos: mockTodos,
    isLoading: false,
    error: null,
    inputText: "",
    handleSubmit: vi.fn(),
    toggleTodo: vi.fn(),
    deleteTodoItem: vi.fn(),
    handleInputChange: vi.fn(),
  };

  beforeEach(() => {
    vi.spyOn(hooks, "useTodos").mockImplementation(() => mockUseTodos);
  });

  it("renders todo list correctly", () => {
    render(<TodoContainer />);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    vi.spyOn(hooks, "useTodos").mockImplementation(() => ({
      ...mockUseTodos,
      isLoading: true,
    }));

    render(<TodoContainer />);
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });

  it("shows error state", () => {
    const errorMessage = "Failed to fetch";
    vi.spyOn(hooks, "useTodos").mockImplementation(() => ({
      ...mockUseTodos,
      error: new Error(errorMessage),
    }));

    render(<TodoContainer />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("handles form submission", () => {
    render(<TodoContainer />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    const form = screen.getByTestId("todo-form");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(form);

    expect(mockUseTodos.handleSubmit).toHaveBeenCalled();
  });
});
