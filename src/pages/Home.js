import React, { useState } from "react";
import Calculator from "../components/calculator/Calculator";

export default function Home() {
  const [amount, setAmount] = useState('10')
  
  return (
    <div className="home">
      <h1>This will be a home page soon {amount}</h1>
      <Calculator
        initialValue={amount}
        updateValue={setAmount}></Calculator>
    </div>
  );
}