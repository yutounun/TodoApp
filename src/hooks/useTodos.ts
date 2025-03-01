import { useState, useCallback, ChangeEvent } from "react";
import { Todo } from "../types/todo";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  completeTodo,
  uncompleteTodo,
} from "../libs/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useTodos = () => {
  const queryClient = useQueryClient();
  const [inputText, setInputText] = useState("");

  // Fetch todos with caching
  const {
    data: { data: todos = [] } = { data: [] },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        return await fetchTodos();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch";
        throw new Error(message);
      }
    },
    retry: false, // disable retry on error
  });

  // Add new todo with cache update
  const { mutate: addTodo } = useMutation({
    mutationFn: createTodo,
    onSuccess: (response) => {
      // only update cache if response is successful
      queryClient.setQueryData(
        ["todos"],
        (old: { data: Todo[] } | undefined) => ({
          data: [...(old?.data || []), response.data],
        })
      );
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // if input is empty, don't add todo
      if (!inputText.trim()) return;
      addTodo(inputText);
      setInputText("");
    },
    [inputText, addTodo]
  );

  // Memoize the input change handler
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    },
    [setInputText]
  );

  // Toggle todo completion status
  const toggleTodo = useCallback(
    (id: number) => {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      if (todo) {
        if (todo.completed) {
          uncompleteTodo(id);
        } else {
          completeTodo(id);
        }
        // update todo in cache
        queryClient.setQueryData(
          ["todos"],
          (old: { data: Todo[] } | undefined) => ({
            data: (old?.data || []).map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })
        );
      }
    },
    [todos, queryClient]
  );

  // Delete todo by ID
  const deleteTodoItem = useCallback(
    async (id: number) => {
      const { error } = await deleteTodo(id);
      if (error) {
        console.error(error);
        return;
      }
      queryClient.setQueryData(
        ["todos"],
        (old: { data: Todo[] } | undefined) => ({
          data: (old?.data || []).filter((todo) => todo.id !== id),
        })
      );
    },
    [queryClient]
  );

  return {
    todos,
    isLoading,
    error,
    inputText,
    handleSubmit,
    toggleTodo,
    deleteTodoItem,
    handleInputChange,
  };
};
