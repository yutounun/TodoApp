import { memo, useMemo } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";
import { TODO_ACTIONS } from "../libs/const";
import { LoadingTodoContainer } from "./LoadingTodoContainer";

const todoContainerStyle = "w-full max-w-2xl mx-auto p-6";
const TodoContainer = memo(() => {
  const {
    todos,
    loading,
    error,
    inputText,
    handleSubmit,
    toggleTodo,
    deleteTodoItem,
    handleInputChange,
  } = useTodos();

  // Memoize the todo list
  const todoList = useMemo(
    () => (
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleTodo}
            onDelete={deleteTodoItem}
          />
        ))}
      </ul>
    ),
    [todos, toggleTodo, deleteTodoItem]
  );

  if (loading) {
    return <LoadingTodoContainer />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className={todoContainerStyle}>
      {/* Form for adding new todo */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
          fullWidth
        />
        <Button type="submit">{TODO_ACTIONS.ADD}</Button>
      </form>

      {todoList}
    </div>
  );
});

export default TodoContainer;
