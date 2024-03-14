import React, { useState } from 'react'

export default function App() {
  const [counter,setCounter] = useState(0)
  return (
    <>
    <div>
      <button onClick={()=>setCounter(pre=>pre+1)}>Plus+</button>
      <span>{counter}</span>
      <button onClick={()=>setCounter(pre=>pre-1)}>-Minus</button>
    </div>
    </>
  )
}
