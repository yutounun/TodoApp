import { act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTodos } from "../useTodos";
import * as api from "../../libs/api";
import { Mock } from "vitest";
import { renderHookWithClient } from "../../test/utils";
import { queryClient } from "../../test/setup";

vi.mock("../../libs/api", () => ({
  fetchTodos: vi.fn(),
  createTodo: vi.fn(),
  deleteTodo: vi.fn(),
  completeTodo: vi.fn(),
  uncompleteTodo: vi.fn(),
}));

describe("useTodos", () => {
  const mockTodos = [
    { id: 1, label: "Test Todo 1", completed: false },
    { id: 2, label: "Test Todo 2", completed: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
    (api.fetchTodos as Mock).mockResolvedValue({
      data: mockTodos,
      error: null,
    });
  });

  it("fetches todos on mount", async () => {
    const { result } = renderHookWithClient(() => useTodos());

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.todos).toEqual(mockTodos);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("handles fetch error", async () => {
    const error = new Error("Failed to fetch");
    (api.fetchTodos as Mock).mockRejectedValue(error);

    const { result } = renderHookWithClient(() => useTodos());

    await waitFor(() => {
      expect(result.current.error instanceof Error).toBe(true);
      expect(result.current.error?.message).toBe("Failed to fetch");
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("creates new todo", async () => {
    const newTodo = { id: 3, label: "New Todo", completed: false };
    (api.createTodo as Mock).mockResolvedValue({
      data: newTodo,
      error: null,
    });

    (api.fetchTodos as Mock).mockResolvedValue({
      data: mockTodos,
      error: null,
    });

    const { result } = renderHookWithClient(() => useTodos());

    await waitFor(() => {
      expect(result.current.todos).toEqual(mockTodos);
    });

    act(() => {
      result.current.handleInputChange({
        target: { value: "New Todo" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      const event = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      await result.current.handleSubmit(event);
    });

    expect(api.createTodo).toHaveBeenCalledWith("New Todo");
    await waitFor(() => {
      expect(result.current.todos).toContainEqual(newTodo);
    });
  });
});
