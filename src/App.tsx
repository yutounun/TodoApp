import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      {/* Main */}
      {/* TODO: Separate components */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-neutral-200">Hello World</h1>
      </div>
    </>
  );
}

export default App;
