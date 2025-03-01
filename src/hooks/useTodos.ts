import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Todo } from "../types/todo";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  completeTodo,
  uncompleteTodo,
} from "../libs/api";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from supabase
  useEffect(() => {
    async function getTodos() {
      try {
        const { data } = await fetchTodos();
        if (data) {
          setTodos(data);
        }
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    getTodos();
  }, []);

  // Add new todo
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;

      const { data, error } = await createTodo(inputText);
      if (error) {
        console.error(error);
      }
      if (data) {
        setTodos((prevTodos) => [...prevTodos, data]);
      }
      setInputText("");
    },
    [inputText]
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
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    },
    [todos]
  );

  // Delete todo by ID
  const deleteTodoItem = useCallback(async (id: number) => {
    const { error } = await deleteTodo(id);
    if (error) {
      console.error(error);
      return;
    }
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return {
    todos,
    loading,
    error,
    inputText,
    handleSubmit,
    toggleTodo,
    deleteTodoItem,
    handleInputChange,
  };
};
