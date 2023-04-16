export interface TransactionSearchFilters {
    dateFrom?: Date
    dateTo?: Date
    transactionId?: number
    ownerId?: number
    amountFrom?: number
    amountTo?: number
    payee?: string
    categories?: Array<number>
    comment?: string  
    active?: boolean
    activeDefined?: boolean
    accounts?: Array<number>
    take?: number
    offset?: number
  }

  export function GetDefaultTransactionSearchFilters(){
    const now = new Date()

    return {
        dateFrom: new Date(now.getFullYear() - 1000, 0, 1),
        dateTo: new Date(now.getFullYear() + 1000, 11, 1),
        transactionId: 0,
        ownerId: -1,
        amountFrom: -1000000000,
        amountTo: 1000000000,
        payee: '',
        categories: [],
        comment: '',
        active: false,
        activeDefined: false,
        accounts: [],
        take: 0,
        offset: 0
    }
  }
  