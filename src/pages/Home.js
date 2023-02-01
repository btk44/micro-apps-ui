import Calculator from "../components/calculator/Calculator";
import { useState } from "react";
import { CategoriesTree } from "../fake-data/DummyCategories";
import ItemPicker from "../components/item-picker/ItemPicker";
import DummyAccounts from "../fake-data/DummyAccounts";
import './Home.scss'



export default function Home() {
  const [windows, setWindows] = useState({
    showCategoryPicker: false,
    showAccountPicker: false
  })

  const [transaction, setTransaction] = useState({
    accountId: 0,
    categoryId: 0,
    amount: 0
  })

  function showModal(){
    return windows.showAccountPicker || windows.showCategoryPicker
  }

  function closeWindows(){
    setWindows({ showAccountPicker: false, showCategoryPicker: false })
  }

  function onAmountChange(amount){
    setTransaction({ ...transaction, amount: amount })
  }

  function onAccountChange(account){
    setTransaction({ ...transaction, accountId: account.id })
    closeWindows()
  }

  function categoryChange(category){
    setTransaction({ ...transaction, categoryId: category.id })
    closeWindows()
  }

  function showCategoryPick(){
    setWindows({ showAccountPicker: false, showCategoryPicker: true })
  }

  function showAccountPick(){
    setWindows({ showAccountPicker: true, showCategoryPicker: false })
  }

  return (
    <div className="home">
      <div className='buttons'>
        <button onClick={showCategoryPick}>{ transaction.categoryId ? transaction.categoryId : 'category' }</button>
        <button onClick={showAccountPick}> { transaction.accountId ? transaction.accountId : 'account' }</button>
      </div>
      { false && <Calculator 
        initialValue={transaction.amount}
        updateValue={onAmountChange}></Calculator> }
      { showModal() &&
        <div className='modal'>
          { windows.showCategoryPicker &&
            <ItemPicker 
              onUpdate={categoryChange}
              onCancel={closeWindows}
              sourceItemList={CategoriesTree}
              parentPropName='parentCategory'
              childListPropName='childCategories'
              keyPropName='id'></ItemPicker>
          }
          { windows.showAccountPicker && 
            <ItemPicker 
              onUpdate={onAccountChange}
              onCancel={closeWindows}
              sourceItemList={DummyAccounts}
              keyPropName='id'></ItemPicker>
          }
        </div>
      }
    </div>
  );
}