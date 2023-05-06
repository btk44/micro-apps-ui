import './TransactionList.scss'

import { useEffect, useState } from 'react';
import { Category } from '../../objects/category';
import { Account } from '../../objects/account';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from '../../objects/transaction';
import { redirect } from 'react-router-dom';

export default function TransactionList(){
  const [transactions, setTransactions] = useState(Array<Transaction>)
  const [accounts, setAccounts] = useState(Array<Account>)
  const [categories, setCategories] = useState(Array<Category>)

  useEffect(() => {
    const transactionCall = TransactionService.SearchTransactions({ownerId:1, take: 10000})
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

  function goToEdit(): any{
    return redirect('/edit');
  }

  return (
    <div className='transaction-list-component'>
      <ul>
        { transactions.map((transaction: Transaction) => 
            <li key={transaction.id} onClick={goToEdit}>
              <span>{transaction.amount}</span>
            </li> 
          )
        }
      </ul>
    </div>
  );
}