import Button from "./common/Button";
import { Todo } from "../types/todo";
import { TODO_ACTIONS } from "../libs/const";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const todoItemClass =
  "flex items-center justify-between p-4 bg-white rounded-md shadow-sm";

const TodoItem = ({ todo, onToggleComplete, onDelete }: TodoItemProps) => {
  return (
    <li className={todoItemClass}>
      {/* Todo text */}
      <span className={todo.completed ? "line-through text-neutral-400" : ""}>
        {todo.text}
      </span>

      {/* Todo actions */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.completed ? TODO_ACTIONS.UNDO : TODO_ACTIONS.COMPLETE}
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(todo.id)}>
          {TODO_ACTIONS.DELETE}
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
