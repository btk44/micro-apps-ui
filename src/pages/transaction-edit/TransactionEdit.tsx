import { useEffect } from 'react';
import Calculator from '../../components/calculator/Calculator';
import { useState } from 'react';
import ItemPicker from '../../components/item-picker/ItemPicker';
import './TransactionEdit.scss'
import { TransactionType } from '../../constants/transaction-type';
import { GetEmptyTransaction, Transaction } from '../../objects/transaction';
import { Category } from '../../objects/category';
import { Account } from '../../objects/account';
import TransactionList from '../../components/transaction-list/TransactionList';
import { TransactionService } from '../../services/transaction-service';

export default function TransactionEdit(){
  const [pageLayout, setPageLayout] = useState({
    showCategoryPicker: false,
    showAccountPicker: false,
    theme: 'red-theme'
  })

  const [transactions, setTransactions] = useState(Array<Transaction>)
  const [accounts, setAccounts] = useState(Array<Account>)
  const [categories, setCategories] = useState(Array<Category>)

  const [transaction, setTransaction] = useState(GetEmptyTransaction())
  const [progress, setProgress] = useState('...')

  useEffect(() => {
    const transactionCall = TransactionService.SearchTransactions({ownerId:1})
    const accountsCall = TransactionService.SearchAccounts({ownerId:1})
    const categoryCall = TransactionService.SearchCategories({ownerId:1})

    Promise.all([transactionCall, accountsCall, categoryCall])
           .then(([transactionsResponse, accountsResponse, categoriesResponse]) => {
              setTransactions(transactionsResponse)
              setAccounts(accountsResponse)
              setCategories(categoriesResponse)
           })
           .catch(error => console.error(error))
  }, []);

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

  function getCategoryNameById(id: number){
    let category = categories.find(x => x.id === id);
    if (!category)
      category = categories.flatMap(x => x.subcategories).find(x => x.id === id);
    return category ? category.name : '';
  }

  function getAccountNameById(id: number){
    const account = accounts.find(x => x.id === id);
    return account ? account.name : '';
  }

  function getDateString(): string {
    const year = transaction.date.getFullYear()
    let day = (transaction.date.getDate()).toString()
    let month = (transaction.date.getMonth()+1).toString()

    day = day.length < 2 ? `0${day}` : day
    month = month.length < 2 ? `0${month}` : month

    return `${year}/${month}/${day}`
  }

  function saveTransaction(): void {
    setProgress('saving...')
    TransactionService.SaveTransactions([transaction]).then(
      () => setProgress('done!')
    )
  }

  return (
    <div className={'home ' + pageLayout.theme}>
      <div>
        <TransactionList transactions={ [] }></TransactionList>
      </div>

      <div className='buttons'>
        <button>{ 'Ania' }</button>
        <button> { getDateString() }</button>
        {/* <button className={transaction.type !== TransactionType.Expense ? 'inactive' : ''}
                onClick={() => onTypeChange(TransactionType.Expense)}>expense</button>
        <button className={transaction.type !== TransactionType.Income ? 'inactive' : ''}
                onClick={() => onTypeChange(TransactionType.Income)}>income</button> */}
        <button onClick={showCategoryPick}>{ transaction.categoryId ? getCategoryNameById(transaction.categoryId) : 'category' }</button>
        <button onClick={showAccountPick}> { transaction.accountId ? getAccountNameById(transaction.accountId) : 'account' }</button>
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
              sourceItemList={categories}
              childListPropName='subcategories'
              keyPropName='id'
              descriptionPropName='name'></ItemPicker>
          }
          { pageLayout.showAccountPicker && 
            <ItemPicker 
              onUpdate={onAccountChange}
              onCancel={closeModal}
              sourceItemList={accounts}
              keyPropName='id'
              descriptionPropName='name'></ItemPicker>
          } 
        </div>
      }
      <button onClick={saveTransaction}> save </button>
      <input type='text' placeholder={progress} readOnly></input>
    </div>
  );
}