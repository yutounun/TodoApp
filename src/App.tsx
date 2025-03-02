import Header from "./components/Header";
import React, { Suspense } from "react";
import { LoadingTodoContainer } from "./components/LoadingTodoContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./states/store";
import { increment, decrement } from "./states/counter/counterSlice";

const TodoContainer = React.lazy(() => import("./components/TodoContainer"));

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />

      <main className="container mx-auto py-8">
        <h1 className="text-center text-neutral-700 mb-8">Todo App</h1>
        count:{count}
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <Suspense fallback={<LoadingTodoContainer />}>
          <TodoContainer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
