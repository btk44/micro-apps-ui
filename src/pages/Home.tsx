import React from 'react';
import Calculator from '../components/calculator/Calculator';
import { useState } from 'react';
import { CategoriesStructure } from '../fake-data/DummyCategories';
import ItemPicker from '../components/item-picker/ItemPicker';
import DummyAccounts from '../fake-data/DummyAccounts';
import './Home.scss'
import { TransactionType } from '../constants/transaction-type';
import { Transaction } from '../objects/transaction';
import { Category } from '../objects/category';
import { Account } from '../objects/account';

export default function Home(){
  const [pageLayout, setPageLayout] = useState({
    showCategoryPicker: false,
    showAccountPicker: false,
    theme: 'red-theme'
  })

  const [transaction, setTransaction] = useState({date: new Date(), amount: 0} as Transaction)

  function showModal(): boolean {
    return pageLayout.showAccountPicker || pageLayout.showCategoryPicker
  }

  function closeModal(): void {
    setPageLayout({ ...pageLayout, showAccountPicker: false, showCategoryPicker: false })
  }

  function showCategoryPick(): void {
    setPageLayout({ ...pageLayout, showCategoryPicker: true })
  }

  function showAccountPick(): void {
    setPageLayout({ ...pageLayout, showAccountPicker: true })
  }

  function onAmountChange(amount: number): void {
    setTransaction({ ...transaction, amount: amount })
  }

  function onTypeChange(type: TransactionType): void {
    setPageLayout({ ...pageLayout, theme: type === TransactionType.Expense ? 'red-theme' : 'green-theme'})
    //setTransaction({ ...transaction, type: type })
  }

  function onAccountChange(account: Account): void {
    setTransaction({ ...transaction, accountId: account.id })
    closeModal()
  }

  function onCategoryChange(category: Category): void {
    setTransaction({ ...transaction, categoryId: category.id })
    closeModal()
  }

  function getDateString(): string {
    const year = transaction.date.getFullYear()
    let day = (transaction.date.getDate()).toString()
    let month = (transaction.date.getMonth()+1).toString()

    day = day.length < 2 ? `0${day}` : day
    month = month.length < 2 ? `0${month}` : month

    return `${year}/${month}/${day}`
  }

  return (
    <div className={'home ' + pageLayout.theme}>
      <div className='buttons'>
        <button>{ 'Ania' }</button>
        <button> { getDateString() }</button>
        {/* <button className={transaction.type !== TransactionType.Expense ? 'inactive' : ''}
                onClick={() => onTypeChange(TransactionType.Expense)}>expense</button>
        <button className={transaction.type !== TransactionType.Income ? 'inactive' : ''}
                onClick={() => onTypeChange(TransactionType.Income)}>income</button> */}
        <button onClick={showCategoryPick}>{ transaction.categoryId ? transaction.categoryId : 'category' }</button>
        <button onClick={showAccountPick}> { transaction.accountId ? transaction.accountId : 'account' }</button>
      </div>
      <input type='text' placeholder='kto / komu'></input>
      { <Calculator 
        initialValue={transaction.amount}
        updateValue={onAmountChange}></Calculator> }
      { showModal() &&
        <div className='modal'>
          { pageLayout.showCategoryPicker &&
            <ItemPicker 
              onUpdate={onCategoryChange}
              onCancel={closeModal}
              sourceItemList={CategoriesStructure}
              //parentPropName='parentCategory'
              parentPropName='categoryGroupName'
              childListPropName='childCategories'
              keyPropName='id'
              descriptionPropName='name'></ItemPicker>
          }
          { pageLayout.showAccountPicker && 
            <ItemPicker 
              onUpdate={onAccountChange}
              onCancel={closeModal}
              sourceItemList={DummyAccounts}
              keyPropName='id'
              descriptionPropName='name'></ItemPicker>
          }
        </div>
      }
    </div>
  );
}