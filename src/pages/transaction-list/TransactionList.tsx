import './TransactionList.scss'

import { useEffect } from 'react';
import { Transaction } from '../../objects/Transaction';
import { Link } from 'react-router-dom';
import { initialLoad, selectAccounts, selectCategories, selectTransactions } from '../../store/TransactionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOwnerId } from '../../store/UserSlice';


export default function TransactionList(){
  const ownerId = useAppSelector(selectOwnerId)

  const accounts = useAppSelector(selectAccounts)
  const categories = useAppSelector(selectCategories)
  const transactions = useAppSelector(selectTransactions)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initialLoad({ownerId: ownerId, transactionCount: 10000}))
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

  return (
    <div className='transaction-list-component'>
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
    </div>
  );
}