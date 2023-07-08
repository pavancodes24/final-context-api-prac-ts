import React from "react";
import { useCounter, useText } from "../Context/CreateContext";

const Counter2 = () => {
  const { count, increment, decrement } = useCounter();
  const { text, onHandleInputChange } = useText();
  return (
    <div>
      <div>cart count is {count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <input type="text" onChange={onHandleInputChange} value={text} />
      <div>{text}</div>
    </div>
  );
};

export default Counter2;
