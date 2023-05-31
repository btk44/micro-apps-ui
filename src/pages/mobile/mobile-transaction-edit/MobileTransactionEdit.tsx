import './MobileTransactionEdit.scss'

import { useEffect, useState } from 'react'
import Calculator from '../../../components/calculator/Calculator'
import { TransactionService } from '../../../services/TransactionService'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectAccounts, selectCategories, selectCategoryTypes, selectCurrencies, selectCurrentTransaction } from '../../../store/TransactionSlice'
import { useNavigate } from 'react-router-dom'
import { CategoryTypeCode } from '../../../constants/category-type'

export default function MobileTransactionEdit(){
  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const currencies = useAppSelector(selectCurrencies)
  const categoryTypes = useAppSelector(selectCategoryTypes)
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

  function getAmountSign(): string {
    const categoryType = transaction.categoryId > 0 ? categoryTypes[categories[transaction.categoryId].typeId].name : ''
    return categoryType === CategoryTypeCode.Income ? '+' : '-'
  }

  function getTransactionCurrencyCode(): string {
    return transaction.accountId > 0 ? currencies[accounts[transaction.accountId].currencyId].code : ''
  }

  function isCategoryTypeActive(categoryTypeCode: string): boolean {
    const transactionCategoryType = transaction.categoryId > 0 ? categoryTypes[categories[transaction.categoryId].typeId].code : ''
    return transactionCategoryType === categoryTypeCode
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
    <div className={'mobile-transaction-edit-component component'}>
      <div className='category-types-section'>
        { Object.values(categoryTypes).map(type => 
          <button className={ isCategoryTypeActive(type.code) ? 'active-button' : '' }> 
            {type.name} 
          </button> 
        )}
      </div>
      <div className='amount-section'>
        <span className='sign'>{ getAmountSign() }</span>
        <span className='amount'>{ transaction.amount }</span>
        <span className='currency'>{ getTransactionCurrencyCode() }</span>
      </div>
      <div className='buttons'>
        <button onClick={() => navigate(`/mobile-category-picker/0`)}>
          { transaction.categoryId ? getCategoryNameById(transaction.categoryId) : 'kategoria' }
        </button>
        <button onClick={() => navigate(`/mobile-account-picker`)}> 
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