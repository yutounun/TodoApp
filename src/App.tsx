import Header from "./components/Header";
import React, { Suspense } from "react";
import { LoadingTodoContainer } from "./components/LoadingTodoContainer";

const TodoContainer = React.lazy(() => import("./components/TodoContainer"));

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />

      <main className="container mx-auto py-8">
        <h1 className="text-center text-neutral-700 mb-8">Todo App</h1>

        <Suspense fallback={<LoadingTodoContainer />}>
          <TodoContainer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
