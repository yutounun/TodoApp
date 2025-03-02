import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import React, { Suspense } from "react";
import { LoadingTodoContainer } from "./components/LoadingTodoContainer";
import Counter from "./components/Counter";

const TodoContainer = React.lazy(() => import("./components/TodoContainer"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-100">
        <Header />
        <main className="container mx-auto py-8">
          <Suspense fallback={<LoadingTodoContainer />}>
            <Routes>
              <Route path="/todo" element={<TodoContainer />} />
              <Route path="/counter" element={<Counter />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
