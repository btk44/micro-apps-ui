export interface Transaction {
  id: number
  ownerId: number
  date: Date
  accountId: number
  amount: number
  categoryId: number
  groupKey: string | null
  payee: string
  comment: string  
  active: boolean
}

export function GetEmptyTransaction() : Transaction {
  return {
      id: 0,
      ownerId: 1,
      date: new Date(),
      accountId: 0,
      amount: 0,
      categoryId: 0,
      groupKey: null,
      payee: '',
      comment: '',  
      active: true
  }
}