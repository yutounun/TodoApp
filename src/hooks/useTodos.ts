import { useState, useEffect } from "react";
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputText);
    setInputText("");
  };

  // Add new todo with unique ID and default completed status
  const addTodo = (text: string) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(), // Use timestamp as unique ID
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  // Toggle todo completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo by ID
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    inputText,
    setInputText,
    handleSubmit,
    toggleTodo,
    deleteTodo,
  };
};
