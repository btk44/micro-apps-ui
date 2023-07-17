import './MobileTransactionList.scss'

import { useEffect, useRef, useState } from 'react';
import { GetEmptyTransaction, Transaction } from '../../../objects/Transaction';
import { useNavigate } from 'react-router-dom';
import { loadTransactions, selectAccounts, selectCategories, setCurrentTransaction } from '../../../store/TransactionSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOwnerId } from '../../../store/UserSlice';


export default function MobileTransactionList(){
  const transactionPageSize = 4
  const transactionsPage = useRef(0)
  const [transactions, setTransactions] = useState([])

  const ownerId = useAppSelector(selectOwnerId)
  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => { loadMoreTransactions() }, []);

  function getMainInfoText(transaction: Transaction): string {
    if(transaction.groupTransactions?.length){
      const balanceTransacion = transaction.groupTransactions[0]
      return accounts[balanceTransacion.accountId].name
    }

    return transaction.payee ? transaction.payee : '--'
  }

  function getTransactionSign(transaction: Transaction): string {
    return transaction.amount > 0 ? '+' : transaction.amount < 0 ? '-' : '';
  }

  function getAmountColor(transaction: Transaction): string {
    return transaction.amount > 0 ? 'green' : transaction.amount < 0 ? 'red' : 'yellow';
  }

  function loadMoreTransactions(): void {
    dispatch(loadTransactions({ownerId: ownerId, take: transactionPageSize, active: true, activeDefined: true,
      offset: transactionsPage.current * transactionPageSize })).then(transactionsResponse => {
        setTransactions(transactions.concat(transactionsResponse.payload))
      })
    transactionsPage.current++
  }

  function onTransactionSelected(transaction: Transaction){
    dispatch(setCurrentTransaction(structuredClone(transaction)))
    navigate('/mobile-edit')
  }

  return (
    <div className='mobile-transaction-list-component component'>
      <button onClick={() => onTransactionSelected(GetEmptyTransaction())}>new</button>
      <ul>
        { transactions.map((transaction: Transaction) => 
            <li key={transaction.id} /*style={{borderLeftColor: categories[transaction.categoryId].color}}*/ onClick={() => onTransactionSelected(transaction)}>
                <div>
                  <span>{categories[transaction.categoryId].name}</span>
                  <span>{accounts[transaction.accountId].name}</span>
                </div>
                <div className='main-details'>
                  <span className='main-text'>{ getMainInfoText(transaction) }</span>
                  <span>
                    <span className={`main-text ${getAmountColor(transaction)}-text`}>{getTransactionSign(transaction)}</span>
                    <span className={`main-text ${getAmountColor(transaction)}-text`}>{ Math.abs(transaction.amount) }</span>
                    <span>PLN</span>
                  </span>
                </div>
                { transaction.comment && 
                  <div>
                    <span>{transaction.comment ? transaction.comment : ''}</span>
                  </div>
                }
            </li> 
          )
        }
      </ul>
      <button onClick={loadMoreTransactions}>load more</button>
    </div>
  );
}