import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import React, { Suspense } from "react";
import { LoadingTodoContainer } from "./components/LoadingTodoContainer";
import { LoadingCounter } from "./components/LoadingCounter";

const TodoContainer = React.lazy(() => import("./components/TodoContainer"));
const Counter = React.lazy(() => import("./components/Counter"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-100">
        <Header />
        <main className="container mx-auto py-8">
          <Routes>
            <Route
              path="/todo"
              element={
                <Suspense fallback={<LoadingTodoContainer />}>
                  <TodoContainer />
                </Suspense>
              }
            />
            <Route
              path="/counter"
              element={
                <Suspense fallback={<LoadingCounter />}>
                  <Counter />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
