//import React, { useState } from "react";
//import Calculator from "../components/calculator/Calculator";

import CategoryPicker from "../components/category-picker/CategoryPicker";

export default function Home() {
  //const [amount, setAmount] = useState('10')
  
  return (
    <div className="home">
      <h1>This will be a home page soon</h1>
      <div style={{width: '500px', height: '500px', margin: '20px'}}>
        {/* <Calculator
          initialValue={amount}
          updateValue={setAmount}></Calculator> */}

          <CategoryPicker></CategoryPicker>
      </div>
    </div>
  );
}