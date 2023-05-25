import './TransactionEdit.scss'

import { useEffect, useState } from 'react'
import Calculator from '../../components/calculator/Calculator'
import { GetEmptyTransaction, Transaction } from '../../objects/Transaction'
import { TransactionService } from '../../services/TransactionService'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectAccounts, selectCategories, selectCurrentTransaction, selectTransactions } from '../../store/TransactionSlice'
import { useNavigate } from 'react-router-dom'

export default function TransactionEdit(){
  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const dispatch = useAppDispatch()

  const [transaction, setTransaction] = useState(currentTransaction)
  const [progress, setProgress] = useState('...')

  const navigate = useNavigate()

  useEffect(() => {  }, []);

  function onAmountChange(amount: number): void {
    setTransaction({ ...transaction, amount: amount })
  }

  function getCategoryNameById(id: number){
    let category = categories[id]
    return category ? category.name : ''
  }

  function getAccountNameById(id: number){
    const account = accounts[id]
    return account ? account.name : ''
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
    <div className={'transaction-edit-component component'}>
      <div className='buttons'>
        <button>{ 'Ania' }</button>
        <button> { getDateString() }</button>
      </div>
      <div className='buttons'>
        <button onClick={() => navigate(`/category-picker/${transaction.categoryId}`)}>
          { transaction.categoryId ? getCategoryNameById(transaction.categoryId) : 'kategoria' }
        </button>
        <button onClick={() => () => navigate(`/account-picker/${transaction.categoryId}`)}> 
          { transaction.accountId ? getAccountNameById(transaction.accountId) : 'konto' }
        </button>
      </div>
      <input type='text' placeholder='kto / komu'></input>
      { <Calculator 
        initialValue={transaction.amount}
        updateValue={onAmountChange}></Calculator> }
      <button onClick={saveTransaction}> save </button>
      <input type='text' placeholder={progress} readOnly></input>
    </div>
  );
}