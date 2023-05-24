import './TransactionList.scss'

import { useEffect, useState } from 'react';
import { Transaction } from '../../objects/Transaction';
import { Link } from 'react-router-dom';
import { initTransactionStore, loadTransactions, selectAccounts, selectCategories, selectTransactions } from '../../store/TransactionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOwnerId } from '../../store/UserSlice';


export default function TransactionList(){
  const transactionPageSize = 2
  const [transactionsPage, setTransactionsPage] = useState(0)

  const ownerId = useAppSelector(selectOwnerId)

  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const transactions = useAppSelector(selectTransactions)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initTransactionStore({ownerId: ownerId, 
      take: transactionPageSize, offset: transactionsPage * transactionPageSize}))
    setTransactionsPage(transactionsPage + 1)
  }, []);

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
    dispatch(loadTransactions({ownerId: ownerId, take: transactionPageSize, 
      offset: transactionsPage * transactionPageSize }))
    setTransactionsPage(transactionsPage + 1)
  }

  return (
    <div className='transaction-list-component component'>
      <ul>
        { transactions.map((transaction: Transaction) => 
            <li key={transaction.id} style={{borderLeftColor: categories[transaction.categoryId].color}}>
              <Link to='/edit'>
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
              </Link>
            </li> 
          )
        }
      </ul>
      <button onClick={loadMoreTransactions}>load more</button>
    </div>
  );
}