import Calculator from '../components/calculator/Calculator';
import { useState } from 'react';
import { CategoriesTree } from '../fake-data/DummyCategories';
import ItemPicker from '../components/item-picker/ItemPicker';
import DummyAccounts from '../fake-data/DummyAccounts';
import './Home.scss'

const TransactionType = {
  Expense: 'exp',
  Income: 'inc',
  Transfer: 'tra' // maybe in the future
}

export default function Home() {
  const [pageLayout, setPageLayout] = useState({
    showCategoryPicker: false,
    showAccountPicker: false,
  })

  const [transaction, setTransaction] = useState({
    accountId: 0,
    categoryId: 0,
    amount: 0,
    date: new Date(),
    type: TransactionType.Expense
  })

  function showModal(){
    return pageLayout.showAccountPicker || pageLayout.showCategoryPicker
  }

  function closeModal(){
    setPageLayout({ ...pageLayout, showAccountPicker: false, showCategoryPicker: false })
  }

  function showCategoryPick(){
    setPageLayout({ ...pageLayout, showCategoryPicker: true })
  }

  function showAccountPick(){
    setPageLayout({ ...pageLayout, showAccountPicker: true })
  }

  function onAmountChange(amount){
    setTransaction({ ...transaction, amount: amount })
  }

  function onTypeChange(type){
    setTransaction({ ...transaction, type: type })
  }

  function onAccountChange(account){
    setTransaction({ ...transaction, accountId: account.id })
    closeModal()
  }

  function categoryChange(category){
    setTransaction({ ...transaction, categoryId: category.id })
    closeModal()
  }

  function getDateString() {
    const year = transaction.date.getFullYear()
    let day = (transaction.date.getDate()).toString()
    let month = (transaction.date.getMonth()+1).toString()

    day = day.length < 2 ? `0${day}` : day
    month = month.length < 2 ? `0${month}` : month

    return `${year}/${month}/${day}`
  }

  return (
    <div className='home'>
      <div className='buttons'>
        <button>{ 'Ania' }</button>
        <button> { getDateString() }</button>
        <button className={transaction.type !== TransactionType.Expense ? 'inactive' : ''}
                onClick={() => onTypeChange(TransactionType.Expense)}>expense</button>
        <button className={transaction.type !== TransactionType.Income ? 'inactive' : ''}
                onClick={() => onTypeChange(TransactionType.Income)}>income</button>
        <button onClick={showCategoryPick}>{ transaction.categoryId ? transaction.categoryId : 'category' }</button>
        <button onClick={showAccountPick}> { transaction.accountId ? transaction.accountId : 'account' }</button>
      </div>
      { <Calculator 
        initialValue={transaction.amount}
        updateValue={onAmountChange}></Calculator> }
      { showModal() &&
        <div className='modal'>
          { pageLayout.showCategoryPicker &&
            <ItemPicker 
              onUpdate={categoryChange}
              onCancel={closeModal}
              sourceItemList={CategoriesTree}
              parentPropName='parentCategory'
              childListPropName='childCategories'
              keyPropName='id'></ItemPicker>
          }
          { pageLayout.showAccountPicker && 
            <ItemPicker 
              onUpdate={onAccountChange}
              onCancel={closeModal}
              sourceItemList={DummyAccounts}
              keyPropName='id'></ItemPicker>
          }
        </div>
      }
    </div>
  );
}