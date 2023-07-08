import { useState } from "react";


import Counter from "./components/Counter";
import { ContextProvider } from "./Context/CreateContext";
import Counter2 from "./components/Counter2";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ContextProvider>
        <Counter>{(count: number) => <>count is {count}</>}</Counter>
        <Counter2/>
      </ContextProvider>
    </>
  );
}

export default App;
