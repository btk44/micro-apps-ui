export interface AccountSearchFilters {
    ownerId?: number
    currencies?: Array<number>
    name?: string
    amountFrom?: number
    amountTo?: number
    id?: number
    active?: boolean
    activeDefined?: boolean
  }

  export function GetDefaultAccountSearchFilters(){
    return {
        ownerId: -1,
        currencies: [],
        name: '',
        amountFrom: -1000000000,
        amountTo: 1000000000,
        id: 0,
        active: false,
        activeDefined: false,
    }
  }
  