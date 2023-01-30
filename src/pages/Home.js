//import React, { useState } from "react";
//import Calculator from "../components/calculator/Calculator";

import { useState } from "react";
import { CategoriesTree } from "../components/category-picker/DummyCategories";
import ItemPicker from "../components/item-picker/ItemPicker";



export default function Home() {
  //const [amount, setAmount] = useState('10')
  const [categoryId, setCategoryId] = useState(0)
  const categoriesTree = CategoriesTree
  const [showPicker, setShowPicker] = useState(false)

  function categoryChange(category){
    setCategoryId(category.id)
    console.log(`${categoryId} ->  ${category.id}`)
    setShowPicker(false)
  }

  function onCancel(){
    console.log('cancel')
    setShowPicker(false)
  }

  return (
    <div className="home">
      <h1>This will be a home page soon</h1>
      <div style={{width: '500px', height: '500px', margin: '20px'}}>
        {/* <Calculator
          initialValue={amount}
          updateValue={setAmount}></Calculator> */}

          <button onClick={() => setShowPicker(true)}>show</button>
          { showPicker &&
            <ItemPicker 
              onUpdate={categoryChange}
              onCancel={onCancel}
              sourceItemList={categoriesTree}
              parentPropName='parentCategory'
              childListPropName='childCategories'
              keyPropName='id'></ItemPicker>
          }
      </div>
    </div>
  );
}