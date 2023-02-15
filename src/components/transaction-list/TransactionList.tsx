import React from 'react'
import './TransactionList.scss'
import { useState } from 'react'
import { Transaction } from '../../objects/transaction'

interface TransactionListProps{
  transactions: Transaction[]
}

export default function TransactionList(props: TransactionListProps) {
  return (
  <div className='transaction-list-component'>
    <ul>
      { props.transactions.map((transaction: Transaction) => 
          <li key={transaction.id}>
            <span>{ transaction.amount }</span>
          </li> 
        )
      }
    </ul>
  </div>
  )
} 