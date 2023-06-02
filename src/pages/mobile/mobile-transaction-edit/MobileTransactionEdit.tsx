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

  function getAmountTextSize(){
    var length = transaction.amount.toString().length;
    if (length > 7) return 2
    if (length > 5) return 3
    if (length > 3) return 4
    return 6;
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
        <span className={'amount font-size-' + getAmountTextSize()}>{ transaction.amount }</span>
        <span className='currency'>{ getTransactionCurrencyCode() }</span>
      </div>
      <div className='account-category-section'>
        <button onClick={() => navigate(`/mobile-account-picker`)}> 
          { transaction.accountId ? getAccountNameById(transaction.accountId) : 'konto' }
        </button>
        <button onClick={() => navigate(`/mobile-category-picker/0`)}>
          { transaction.categoryId ? getCategoryNameById(transaction.categoryId) : 'kategoria' }
        </button>
      </div>
      <input type='text' placeholder='kto / komu'></input>
      <div className='calculator-section'>
        { <Calculator initialValue={transaction.amount} updateValue={onAmountChange}></Calculator> }
      </div>
    </div>
  );
}