import './MobileTransactionEdit.scss'

import { useEffect, useState } from 'react'
import Calculator from '../../../components/calculator/Calculator'
import { TransactionService } from '../../../services/TransactionService'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectAccounts, selectCategories, selectCategoryTypes, selectCurrencies, selectCurrentTransaction, setCurrentTransaction } from '../../../store/TransactionSlice'
import { useNavigate } from 'react-router-dom'
import { CategoryTypeCode } from '../../../constants/category-type'
import { GetEmptyTransaction } from '../../../objects/Transaction'

export default function MobileTransactionEdit(){
  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const currentTransaction = useAppSelector(selectCurrentTransaction)
  const currencies = useAppSelector(selectCurrencies)
  const categoryTypes = useAppSelector(selectCategoryTypes)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [transaction, setTransaction] = useState(structuredClone(currentTransaction))
  const [transactionCategoryTypeCode, setTransactionCategoryTypeCode] = useState(CategoryTypeCode.Expense.toString())

  useEffect(() => { setTransactionCategoryTypeCode(
    transaction.categoryId > 0 ? categoryTypes[categories[transaction.categoryId].typeId].code : '') })

  useEffect(() => {
    dispatch(setCurrentTransaction(structuredClone(transaction)))
  }, [transaction]);

  function onAmountChange(amount: number): void {
    setTransaction({ ...transaction, amount: amount })
  }

  function onTransactionCategoryTypeChange(categoryTypeCode: string): void {
    const categoryType = Object.values(categoryTypes).filter(x => x.code === categoryTypeCode)[0]
    if(!categoryType){
      showMessage(`no category type for: ${categoryTypeCode}`)
      return
    }
    
    const categoriesFlatList =  Object.values(categories).concat(Object.values(categories).flatMap(x => x.subcategories))
    const firstCategoryFromType = categoriesFlatList.filter(x => x.parentId === 0 && x.typeId === categoryType.id)[0]
    if(!firstCategoryFromType){
      showMessage(`no category for type ${categoryType.name}`)
      return
    }

    const updatedTransaction = structuredClone(transaction)

    if (categoryTypeCode === CategoryTypeCode.Transfer)
      updatedTransaction.groupTransactions = [{ ...GetEmptyTransaction(), amount: -1 * transaction.amount }]

    updatedTransaction.categoryId = firstCategoryFromType.id

    setTransaction(updatedTransaction)
    setTransactionCategoryTypeCode(categoryTypeCode)
  }

  function showMessage(message: String){ // to do : move it outside component
    alert(message)
  }

  function getCategoryNameById(id: number){
    let category = categories[id]
    return category ? category.name : ''
  }

  function getAccountNameById(id: number){
    const account = accounts[id]
    return account ? account.name : ''
  }

  function getTransactionCurrencyCode(): string {
    return transaction.accountId > 0 ? currencies[accounts[transaction.accountId].currencyId].code : ''
  }

  function getAmountSign(): string {
    const categoryTypeCode = transactionCategoryTypeCode
    return categoryTypeCode === CategoryTypeCode.Income ? '+' : categoryTypeCode === CategoryTypeCode.Expense ? '-' : ''
  }

  function isTransfer(){
    return transactionCategoryTypeCode === CategoryTypeCode.Transfer
  }

  function getAmountTextSize(){
    var length = transaction.amount.toString().length;
    if (length > 7) return 2
    if (length > 5) return 3
    if (length > 3) return 4
    return 6;
  }

  // function saveTransaction(): void {
  //   setProgress('saving...')
  //   TransactionService.SaveTransactions([transaction]).then(
  //     () => setProgress('done!')
  //   )
  // }

  return (
    <div className={'mobile-transaction-edit-component component'}>
      <div className='category-types-section'>
        { Object.values(categoryTypes).map(type => 
          <button key={type.code} 
                  className={ type.code === transactionCategoryTypeCode ? 'active-button' : '' }
                  onClick={() => onTransactionCategoryTypeChange(type.code)}> 
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
        <button onClick={() => navigate(`/mobile-account-picker?isPrimary=true`)}> 
          { transaction.accountId ? getAccountNameById(transaction.accountId) : 'konto' }
        </button>
        { isTransfer() && <>
          <button className='arrow'>&#8594;</button> 
          <button onClick={() => navigate(`/mobile-account-picker?isPrimary=false`)}> 
            { transaction.accountId ? getAccountNameById(transaction.accountId) : 'konto' }
          </button>
          <input type='text' placeholder={ '1EUR = 14.5235PLN'}></input>
          </> }
        { !isTransfer() && <>
          <button onClick={() => navigate(`/mobile-category-picker/0`)}>
            { transaction.categoryId ? getCategoryNameById(transaction.categoryId) : 'kategoria' }
          </button>
          <input type='text' placeholder='kto / komu'></input>
          </> }
      </div>
      <div className='calculator-section'>
        { <Calculator initialValue={transaction.amount} updateValue={onAmountChange}></Calculator> }
      </div>
    </div>
  );
}