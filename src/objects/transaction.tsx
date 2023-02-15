import { TransactionType } from '../constants/transaction-type'

export class Transaction {
    id: number
    accountId: number
    categoryId: number
    amount: number
    date: Date
    payee: string
    type: TransactionType   
  
    constructor() { // change it later
      this.id = 0
      this.accountId = 0
      this.categoryId = 0
      this.amount = 0
      this.date = new Date()
      this.payee= ''
      this.type = TransactionType.Expense    
    }
  }
