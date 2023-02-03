import { TransactionType } from '../constants/transaction-type'

export class Transaction {
    accountId: number
    categoryId: number
    amount: number
    date: Date
    type: TransactionType   
  
    constructor() { // change it later
      this.accountId = 0
      this.categoryId = 0
      this.amount = 0
      this.date = new Date()
      this.type = TransactionType.Expense    
    }
  }
