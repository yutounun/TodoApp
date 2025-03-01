import { memo, useCallback } from "react";
import Button from "./common/Button";
import { Todo } from "../types/todo";
import { TODO_ACTIONS } from "../libs/const";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = memo(({ todo, onToggleComplete, onDelete }: TodoItemProps) => {
  // Memoize button handlers to prevent unnecessary re-renders
  const handleToggle = useCallback(() => {
    onToggleComplete(todo.id);
  }, [todo.id, onToggleComplete]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  return (
    <li className="flex items-center justify-between p-4 bg-card rounded-md shadow-sm">
      {/* Todo text with strike-through when completed */}
      <span
        className={`${
          todo.completed ? "line-through text-neutral-400" : ""
        } dark:text-neutral-800`}
      >
        {todo.label}
      </span>

      {/* Action buttons for todo item */}
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleToggle}>
          {todo.completed ? TODO_ACTIONS.UNDO : TODO_ACTIONS.COMPLETE}
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          {TODO_ACTIONS.DELETE}
        </Button>
      </div>
    </li>
  );
});

export default TodoItem;
