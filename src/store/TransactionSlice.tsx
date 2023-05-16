import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionService } from '../services/transaction-service'
import { Account } from '../objects/account'
import { Category } from '../objects/category'
import { Currency } from '../objects/currency'
import { Transaction } from '../objects/transaction'
import { RootState } from './Store'

// separate this store in the future if needed

interface TransactionsState {
  loading: boolean,
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
  loading: false,
  accounts: [],
  categories: [],
  currencies: [],
  transactions: []
}

export const initialLoad = createAsyncThunk('transaction/initialLoad', async (parameters: TransactionLoadParams) => {
      const transactionCall = TransactionService.SearchTransactions({ownerId: parameters.ownerId, take: parameters.transactionCount})
      const accountsCall = TransactionService.SearchAccounts({ownerId: parameters.ownerId})
      const categoryCall = TransactionService.SearchCategories({ownerId: parameters.ownerId})

      return Promise
        .all([transactionCall, accountsCall, categoryCall])
        .then(([transactionsResponse, accountsResponse, categoriesResponse]) => {
          const accountsDict: any = Object.assign({}, ...accountsResponse.map((x: Account) => ({[x.id]: x})));
          const flattenCategories = categoriesResponse.concat(categoriesResponse.flatMap((x: Category) => x.subcategories))
          const categoriesDict: any = Object.assign({}, ...flattenCategories.map((x: Category) => ({[x.id]: x})));
          return { accounts: accountsDict, categories: categoriesDict, transactions: transactionsResponse, currencies: [] }
        })
})

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(initialLoad.pending, (state: TransactionsState) => { state.loading = true })
    builder.addCase(initialLoad.rejected, (state: TransactionsState) => { state.loading = false })
    builder.addCase(initialLoad.fulfilled, (state: TransactionsState, action) => {  
      state.loading = false
      state.accounts = action.payload.accounts
      state.categories = action.payload.categories
      state.transactions = action.payload.transactions
    })
  }
})

export const selectAccounts = (state: RootState) => state.transactionStore.accounts
export const selectCategories = (state: RootState) => state.transactionStore.categories
export const selectCurrencies = (state: RootState) => state.transactionStore.currencies
export const selectTransactions = (state: RootState) => state.transactionStore.transactions
export default transactionSlice.reducer