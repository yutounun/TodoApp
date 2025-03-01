import { Skeleton } from "./common/skeleton";

export function LoadingTodoContainer() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Loading state for add todo form */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="w-20 h-10 rounded-md" />
      </div>

      {/* Loading state for todo list */}
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-card rounded-md"
          >
            <Skeleton className="w-2/3 h-6" />
            <div className="flex gap-2">
              <Skeleton className="w-24 h-8 rounded-md" />
              <Skeleton className="w-20 h-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
