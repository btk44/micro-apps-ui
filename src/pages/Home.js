import React, { useState } from "react";
import Calculator from "../components/calculator/Calculator";

export default function Home() {
  function testHandler(value){
    setResult(value)
    console.log('home ' + value)
  }

  const [result, setResult] = useState('0')
  
  return (
    <div className="home">
      <h1>This will be a home page soon</h1>
      <Calculator
        result={result}
        resultChanged={testHandler}></Calculator>
    </div>
  );
}