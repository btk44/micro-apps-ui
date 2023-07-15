import './MobileTransactionEdit.scss'

import { useEffect, useMemo, useState } from 'react'
import Calculator from '../../../components/calculator/Calculator'
import { TransactionService } from '../../../services/TransactionService'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectAccounts, selectCategories, selectCategoryTypes, selectCurrencies, selectCurrentTransaction, setCurrentTransaction } from '../../../store/TransactionSlice'
import { useNavigate } from 'react-router-dom'
import { CategoryTypeCode } from '../../../constants/category-type'
import { GetEmptyTransaction, Transaction } from '../../../objects/Transaction'

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
  const [calculatorKey, setCalculatorKey] = useState('calc123') // unfortunate hack to reset calculator state

  const isTransfer = useMemo(() => transactionCategoryTypeCode === CategoryTypeCode.Transfer, [transactionCategoryTypeCode])
  const isExpense = useMemo(() => transactionCategoryTypeCode === CategoryTypeCode.Expense, [transactionCategoryTypeCode])
  const isIncome = useMemo(() => transactionCategoryTypeCode === CategoryTypeCode.Income, [transactionCategoryTypeCode])

  useEffect(() => 
    { setTransactionCategoryTypeCode(
        transaction.categoryId > 0 
          ? categoryTypes[categories[transaction.categoryId].typeId].code 
          : CategoryTypeCode.Expense) 
    }, [])

  useEffect(() => {
    dispatch(setCurrentTransaction(structuredClone(transaction)))
  }, [transaction]);

  function onAmountChange(amount: number): void {
    const updatedTransaction = structuredClone(transaction)

    updatedTransaction.amount = isIncome ? amount : -1 * amount
    if(isTransfer && updatedTransaction.groupTransactions?.length)
      updatedTransaction.groupTransactions[0].amount = amount

    setTransaction(updatedTransaction)
  }

  function onTransactionCategoryTypeChange(categoryTypeCode: string): void {
    changeTransactionCategoryType(categoryTypeCode, transaction)
  }

  function changeTransactionCategoryType(categoryTypeCode: string, sourceTransaction: Transaction){
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

    const updatedTransaction = structuredClone(sourceTransaction)

    updatedTransaction.categoryId = firstCategoryFromType.id
    updatedTransaction.amount = categoryTypeCode === CategoryTypeCode.Income 
                                  ? Math.abs(updatedTransaction.amount) 
                                  : -1 * Math.abs(updatedTransaction.amount)

    if (categoryTypeCode === CategoryTypeCode.Transfer){
      let balanceTransaction = updatedTransaction.groupTransactions? updatedTransaction.groupTransactions[0] : null

      if(!balanceTransaction){
        updatedTransaction.groupKey = getTransactionGroupKey()

        balanceTransaction = structuredClone(updatedTransaction)
        updatedTransaction.groupTransactions = [balanceTransaction]
        balanceTransaction.accountId = 0
        balanceTransaction.id = 0
        balanceTransaction.groupTransactions = null
      }   

      balanceTransaction.amount = -1 * updatedTransaction.amount
    }

    setTransaction(updatedTransaction)
    setTransactionCategoryTypeCode(categoryTypeCode)
  }

  function showMessage(message: String){ // to do : move it outside component
    alert(message)
  }

  function getTransactonCategoryName(){
    if(transaction.categoryId <= 0 || !categories[transaction.categoryId])
      return 'kategoria'

    return categories[transaction.categoryId].name
  }

  function getTransactionAccountName(){
    return getAccountName(transaction)
  }

  function getBalanceTransactionAccountName(){
    return transaction.groupTransactions?.length
      ? getAccountName(transaction.groupTransactions[0])
      : getAccountName(undefined)
  }

  function getAccountName(sourceTransaction?: Transaction){
    if(!sourceTransaction || sourceTransaction.accountId <= 0 || !accounts[sourceTransaction.accountId])
      return 'konto'

    return accounts[sourceTransaction.accountId].name
  }

  function getTransactionCurrencyCode(): string {
    if(transaction.accountId <= 0 || !accounts[transaction.accountId] || !currencies[accounts[transaction.accountId].currencyId])
      return ''

    return currencies[accounts[transaction.accountId].currencyId].code
  }

  function getAmountSign(): string {
    return isIncome ? '+' : (isExpense ? '-' : '')
  }

  function getAmountTextSize(){
    var length = Math.abs(transaction.amount).toString().length;
    if (length > 7) return 2
    if (length > 5) return 3
    if (length > 3) return 4
    return 6;
  }

  function getTransactionGroupKey() {
    return Date.now().toString() + Math.random().toString().substring(3, 10).padEnd(7, '0');
  }

  function saveTransaction(): void {
    const transactionToSave = structuredClone(transaction)
    const transactions = [transactionToSave]

    if(transactionToSave.accountId <= 0 || !accounts[transactionToSave.accountId])
      return

    if(transactionToSave.categoryId <= 0 || !categories[transactionToSave.categoryId])
      return

    if(isTransfer){
      if(!transactionToSave.groupKey || !transactionToSave.groupTransactions || !transactionToSave.groupTransactions.length)
        return

      transactions.push(transactionToSave.groupTransactions[0])
    }
    else {
      transactionToSave.groupKey = null
      transactionToSave.groupTransactions = null
      const balanceTransaction = transaction.groupTransactions? transaction.groupTransactions[0] : null
      if(balanceTransaction && balanceTransaction.id > 0){
        balanceTransaction.active = false
        balanceTransaction.groupKey = null
        transactions.push(balanceTransaction)
      }
    }

    TransactionService.SaveTransactions(transactions).then(
      (updatedTransactions) => {
        const savedTransaction = structuredClone(updatedTransactions.filter((x: Transaction) => x.amount === transaction.amount)[0])

        if(isTransfer)
          savedTransaction.groupTransactions = [updatedTransactions.filter((x: Transaction) => x.amount !== transaction.amount)[0]]

        setTransaction(savedTransaction)
      }
    )
  }

  function newTransaction() {
    if(isTransfer) changeTransactionCategoryType(CategoryTypeCode.Transfer, GetEmptyTransaction())
    if(isIncome) changeTransactionCategoryType(CategoryTypeCode.Income, GetEmptyTransaction())
    setCalculatorKey(Date.now().toString())
  }

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
        <span className={'amount font-size-' + getAmountTextSize()}>{ Math.abs(transaction.amount) }</span>
        <span className='currency'>{ getTransactionCurrencyCode() }</span>
      </div>
      <div className='account-category-section'>
        <button onClick={() => navigate(`/mobile-account-picker?isPrimary=true`)}> { getTransactionAccountName() } </button>
        { isTransfer && <>
          <button className='arrow'>&#8594;</button> 
          <button onClick={() => navigate(`/mobile-account-picker?isPrimary=false`)}> { getBalanceTransactionAccountName() } </button>
          <input type='text' placeholder={ '1EUR = 14.5235PLN'}></input>
          </> }
        { !isTransfer && <>
          <button onClick={() => navigate(`/mobile-category-picker/0`)}> { getTransactonCategoryName() } </button>
          <input type='text' placeholder='kto / komu'></input>
          </> }
      </div>
      <div className='calculator-section'>
        { <Calculator initialValue={Math.abs(transaction.amount)} updateValue={onAmountChange} key={calculatorKey}></Calculator> }
      </div>
      <button onClick={saveTransaction}>Save</button>
      <button onClick={newTransaction}>New</button>
    </div>
  );
}