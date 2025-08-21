import { useState, useMemo } from "react";

export default function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [num,setNum] = useState(0);

  // Without useMemo, this heavy function would run on every re-render
  const squaredNumber = useMemo(() => {
    console.log("Calculating...");
    return num * num;
  }, [num]);
 
  return (
    <div>
      <p>Squared Number: {squaredNumber}</p>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <div>
      <button onClick={() => setNum(num + 1)}>Increase Num</button>
    </div>
    </div>
  );
}
