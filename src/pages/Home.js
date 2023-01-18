import React, { useState } from "react";
import Calculator from "../components/calculator/Calculator";

export default function Home() {
  function testHandler(value){
    setAmount(value)
    console.log('home ' + value)
  }

  const [amount, setAmount] = useState('10')
  
  return (
    <div className="home">
      <h1>This will be a home page soon</h1>
      <Calculator
        initialValue={amount}
        updateValue={testHandler}></Calculator>
    </div>
  );
}