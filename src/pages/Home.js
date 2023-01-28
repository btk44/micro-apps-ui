//import React, { useState } from "react";
//import Calculator from "../components/calculator/Calculator";

import { useState } from "react";
//import CategoryPicker from "../components/category-picker/CategoryPicker";
import DummyCategories from "../components/category-picker/DummyCategories";
import ItemPicker from "../components/item-picker/ItemPicker";



export default function Home() {
  //const [amount, setAmount] = useState('10')
  const [categoryId, setCategoryId] = useState(0)
  const categories = DummyCategories

  function categoryIdChange(newId){
    setCategoryId(newId)
    console.log(newId)
  }

  return (
    <div className="home">
      <h1>This will be a home page soon</h1>
      <div style={{width: '500px', height: '500px', margin: '20px'}}>
        {/* <Calculator
          initialValue={amount}
          updateValue={setAmount}></Calculator> */}

          {/* <CategoryPicker 
            initialValue={categoryId}
            updateValue={categoryIdChange}></CategoryPicker> */}

          <ItemPicker 
            initialValue={categoryId}
            updateValue={categoryIdChange}
            sourceItemList={categories}></ItemPicker>
      </div>
    </div>
  );
}