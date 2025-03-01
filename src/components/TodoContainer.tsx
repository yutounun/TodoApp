import Button from "./common/Button";
import Input from "./common/Input";
import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";
import { TODO_ACTIONS } from "../libs/const";

const TodoContainer = () => {
  const {
    todos,
    inputText,
    setInputText,
    handleSubmit,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Form for adding new todo */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
          fullWidth
        />
        <Button type="submit">{TODO_ACTIONS.ADD}</Button>
      </form>

      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoContainer;
