import './MobileTransactionList.scss'

import { useEffect, useState } from 'react';
import { Transaction } from '../../../objects/Transaction';
import { useNavigate } from 'react-router-dom';
import { initTransactionStore, loadTransactions, selectAccounts, selectCategories, selectTransactions } from '../../../store/TransactionSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectOwnerId } from '../../../store/UserSlice';


export default function MobileTransactionList(){
  const transactionPageSize = 5
  const [transactionsPage, setTransactionsPage] = useState(1)

  const ownerId = useAppSelector(selectOwnerId)

  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const transactions = useAppSelector(selectTransactions)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loadMoreTransactions()  //fix this
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

  function onTransactionSelected(transaction: Transaction){
    // set current transaction in store
    navigate('/mobile-edit')
  }

  return (
    <div className='mobile-transaction-list-component component'>
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