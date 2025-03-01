import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoItem from "../TodoItem";

describe("TodoItem", () => {
  const mockTodo = {
    id: 1,
    label: "Test Todo",
    completed: false,
  };

  const mockHandlers = {
    onToggleComplete: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders todo item correctly", () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls onToggleComplete when complete button is clicked", () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByText("Complete"));
    expect(mockHandlers.onToggleComplete).toHaveBeenCalledWith(mockTodo.id);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);

    fireEvent.click(screen.getByText("Delete"));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it("shows strike-through style when todo is completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);

    expect(screen.getByText("Test Todo")).toHaveClass("line-through");
    expect(screen.getByText("Undo")).toBeInTheDocument();
  });
});
