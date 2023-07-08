import React, { ReactNode, useState, useReducer, useCallback } from "react";
import { useCounter, useText } from "../Context/CreateContext";



type CounterType = {
  children: (num: number) => ReactNode;
};
const Counter = ({ children }: CounterType) => {
 const {count,increment,decrement}=useCounter();
 const {text,onHandleInputChange} = useText()
  return (
    <div>
      <div>{children(count)}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>

      <input type="text"  onChange={onHandleInputChange} value={text}/>
      <div>{text}</div>
    </div>
  );
};

export default Counter;
