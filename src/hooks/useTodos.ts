import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Todo } from "../types/todo";
import { STORAGE_KEY } from "../libs/const";

export const useTodos = () => {
  // Initialize todos from localStorage or empty array
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [inputText, setInputText] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;

      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          text: inputText,
          completed: false,
        },
      ]);
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
  const toggleTodo = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Delete todo by ID
  const deleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return {
    todos,
    inputText,
    handleSubmit,
    toggleTodo,
    deleteTodo,
    handleInputChange,
  };
};
