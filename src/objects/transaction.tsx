export interface Transaction {
    id: number
    ownerId: number
    date: Date
    accountId: number
    amount: number
    categoryId: number
    groupKey: string

    payee: string
    comment: string  
  }
