//import React, { useState } from "react";
//import Calculator from "../components/calculator/Calculator";

import { useState } from "react";
//import CategoryPicker from "../components/category-picker/CategoryPicker";
import { CategoriesTree } from "../components/category-picker/DummyCategories";
import ItemPicker2 from "../components/item-picker/ItemPicker2";



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

          {/* <CategoryPicker 
            initialValue={categoryId}
            updateValue={categoryIdChange}></CategoryPicker> */}

          <button onClick={() => setShowPicker(true)}>show</button>
          { showPicker &&
            <ItemPicker2 
              onUpdate={categoryChange}
              onCancel={onCancel}
              sourceItemList={categoriesTree}
              parentPropName='parentCategory'
              childListPropName='childCategories'
              keyPropName='id'></ItemPicker2>
          }
      </div>
    </div>
  );
}