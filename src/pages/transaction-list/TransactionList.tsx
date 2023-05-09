import './TransactionList.scss'

import { useEffect, useState } from 'react';
import { Category } from '../../objects/category';
import { Account } from '../../objects/account';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from '../../objects/transaction';
import { Link } from 'react-router-dom';

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