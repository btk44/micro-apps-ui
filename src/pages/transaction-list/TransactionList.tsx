import './TransactionList.scss'

import { useEffect, useState } from 'react';
import { Category } from '../../objects/category';
import { Account } from '../../objects/account';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from '../../objects/transaction';
import { Link, redirect } from 'react-router-dom';

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

              const accountsDict: any = {}
              accountsResponse.forEach((x: Account) => {
                accountsDict[x.id] = x
              });
              setAccounts(accountsDict)

              const categoriesDict: any = {}
              const flattenCategories = categoriesResponse.concat(categoriesResponse.flatMap((x: Category) => x.subcategories))
              flattenCategories.forEach((x: Category) => {
                categoriesDict[x.id] = x
              });
              setCategories(categoriesDict)
           })
           .catch(error => console.error(error))
  }, []);

  function getMainInfoText(transaction: Transaction): string {
    if(transaction.groupTransactions?.length){
      const balanceTransacion = transaction.groupTransactions[0]
      return `${accounts[balanceTransacion.accountId].name} \\2192 ${accounts[transaction.accountId].name}`
    }

    return transaction.payee ? transaction.payee : '--'
  }

  function getTransactionSign(transaction: Transaction): string {
    return transaction.amount > 0 ? '+' : transaction.amount < 0 ? '-' : '';
  }

  return (
    <div className='transaction-list-component'>
      <ul>
        { transactions.map((transaction: Transaction) => 
            <li key={transaction.id}>
              <Link to='/edit'>
                <div className='related-details'>
                  <span className='small-font'>
                    <img className='icon' style={{backgroundColor: categories[transaction.categoryId].color}}/>
                    {categories[transaction.categoryId].name}
                  </span>
                  <span className='small-font'>
                    <img className='icon' style={{backgroundColor: accounts[transaction.accountId].color}}/>
                    {accounts[transaction.accountId].name}
                  </span>
                </div>
                <div className='main-details'>
                  <span>{ getMainInfoText(transaction) }</span>
                  <span>
                    <span>{getTransactionSign(transaction)}</span>
                    <span>{ Math.abs(transaction.amount) }</span>
                    <span className='small-font'>PLN</span>
                  </span>
                </div>
                { transaction.comment && 
                  <div>
                    <span className='small-font'>{transaction.comment ? transaction.comment : ''}</span>
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