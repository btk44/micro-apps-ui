import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionService } from '../services/transaction-service'
import { Account } from '../objects/account'
import { Category } from '../objects/category'
import { Currency } from '../objects/currency'
import { Transaction } from '../objects/transaction'
import { RootState } from './Store'

// separate this store in the future if needed

interface TransactionsState {
  accounts: Array<Account>,
  categories: Array<Category>,
  currencies: Array<Currency>,
  transactions: Array<Transaction>
}

interface TransactionLoadParams {
  ownerId: number, 
  transactionCount: number
}

const initialState: TransactionsState = {
  accounts: [],
  categories: [],
  currencies: [],
  transactions: []
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    initialLoad: (state: any, action: PayloadAction<TransactionLoadParams>) => {
      const transactionCall = TransactionService.SearchTransactions({ownerId: action.payload.ownerId, 
                                                                     take: action.payload.transactionCount})
      const accountsCall = TransactionService.SearchAccounts({ownerId: action.payload.ownerId})
      const categoryCall = TransactionService.SearchCategories({ownerId: action.payload.ownerId})

      Promise.all([transactionCall, accountsCall, categoryCall])
      .then(([transactionsResponse, accountsResponse, categoriesResponse]) => {
         state.transactions = transactionsResponse

         const accountsDict: any = {}
         accountsResponse.forEach((x: Account) => {
           accountsDict[x.id] = x
         });
         state.accounts = accountsDict

         const categoriesDict: any = {}
         const flattenCategories = categoriesResponse.concat(categoriesResponse.flatMap((x: Category) => x.subcategories))
         flattenCategories.forEach((x: Category) => {
           categoriesDict[x.id] = x
         });
         state.categories = categoriesDict
      })
      .catch(error => console.error(error))
    }
  }
})

// export const fetchPosts = createAsyncThunk('transaction/initial', async () => {
//   const response = await client.get('/fakeApi/posts')
//   return response.data
// })

// Action creators are generated for each case reducer function
export const { initialLoad } = transactionSlice.actions
export const selectAccounts = (state: RootState) => state.transactionStore.accounts
export const selectCategories = (state: RootState) => state.transactionStore.categories
export const selectCurrencies = (state: RootState) => state.transactionStore.currencies
export const selectTransactions = (state: RootState) => state.transactionStore.transactions
export default transactionSlice.reducer