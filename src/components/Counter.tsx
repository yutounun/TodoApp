import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";
import { increment, decrement } from "../states/counter/counterSlice";

const baseButtonStyle = "px-4 py-2 text-white rounded hover:bg-red-600";

const Counter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Counter</h1>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => dispatch(decrement())}
          className={`${baseButtonStyle} bg-red-500 `}
        >
          -
        </button>
        <span className="text-xl font-bold">{count}</span>
        <button
          onClick={() => dispatch(increment())}
          className={`${baseButtonStyle} bg-green-500 `}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
