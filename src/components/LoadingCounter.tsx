import { Skeleton } from "./common/skeleton";

export function LoadingCounter() {
  return (
    <div
      className="flex flex-col items-center space-y-4"
      data-testid="loading-counter"
    >
      {/* Value display skeleton */}
      <Skeleton className="w-24 h-12 rounded-md" />

      {/* Buttons skeleton */}
      <div className="flex space-x-4">
        <Skeleton className="w-20 h-10 rounded-md" />
        <Skeleton className="w-20 h-10 rounded-md" />
      </div>
    </div>
  );
}
