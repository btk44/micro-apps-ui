import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionService } from '../services/TransactionService'
import { Account } from '../objects/Account'
import { Category } from '../objects/Category'
import { Currency } from '../objects/Currency'
import { Transaction } from '../objects/Transaction'
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
  transactionCount: number,
  transactionSkip: number
}

const initialState: TransactionsState = {
  loading: false,
  accounts: [],
  categories: [],
  currencies: [],
  transactions: []
}

export const initTransactionStore = createAsyncThunk('transaction/initTransactionStore', async (parameters: TransactionLoadParams) => {
      const transactionCall = TransactionService.SearchTransactions({ownerId: parameters.ownerId, 
        take: parameters.transactionCount, offset: parameters.transactionSkip })
      const accountsCall = TransactionService.SearchAccounts({ownerId: parameters.ownerId})
      const categoryCall = TransactionService.SearchCategories({ownerId: parameters.ownerId})
      const currencyCall = TransactionService.SearchCurrencies()

      return Promise
        .all([transactionCall, accountsCall, categoryCall, currencyCall])
        .then(([transactionsResponse, accountsResponse, categoriesResponse, currencyResponse]) => {
          const accountsDict: any = Object.assign({}, ...accountsResponse.map((x: Account) => ({[x.id]: x})));
          const flattenCategories = categoriesResponse.concat(categoriesResponse.flatMap((x: Category) => x.subcategories))
          const categoriesDict: any = Object.assign({}, ...flattenCategories.map((x: Category) => ({[x.id]: x})));
          const currenciesDict: any = Object.assign({}, ...currencyResponse.map((x: Currency) => ({[x.id]: x})));
          return { accounts: accountsDict, categories: categoriesDict, transactions: transactionsResponse, currencies: currenciesDict }
        })
})

export const loadTransactions = createAsyncThunk('transaction/loadTransactions', async (parameters: TransactionLoadParams) => {
  const transactionCall = TransactionService.SearchTransactions({ownerId: parameters.ownerId, 
    take: parameters.transactionCount, offset: parameters.transactionSkip })

  return transactionCall.then((transactionsResponse) => { return transactionsResponse })
})

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(initTransactionStore.pending, (state: TransactionsState) => { state.loading = true })
    builder.addCase(initTransactionStore.rejected, (state: TransactionsState) => { state.loading = false })
    builder.addCase(initTransactionStore.fulfilled, (state: TransactionsState, action) => {  
      state.loading = false
      state.accounts = action.payload.accounts
      state.categories = action.payload.categories
      state.transactions = action.payload.transactions
      state.currencies = action.payload.currencies
    })
    builder.addCase(loadTransactions.pending, (state: TransactionsState) => { state.loading = true })
    builder.addCase(loadTransactions.rejected, (state: TransactionsState) => { state.loading = false })
    builder.addCase(loadTransactions.fulfilled, (state: TransactionsState, action) => { 
      state.transactions = state.transactions.concat(action.payload) 
    })
  }
})

export const selectAccounts = (state: RootState) => state.transactionStore.accounts
export const selectCategories = (state: RootState) => state.transactionStore.categories
export const selectCurrencies = (state: RootState) => state.transactionStore.currencies
export const selectTransactions = (state: RootState) => state.transactionStore.transactions
export default transactionSlice.reducer