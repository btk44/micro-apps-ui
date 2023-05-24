import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionService } from '../services/TransactionService'
import { Account } from '../objects/Account'
import { Category } from '../objects/Category'
import { Currency } from '../objects/Currency'
import { Transaction } from '../objects/Transaction'
import { RootState } from './Store'
import { TransactionSearchFilters } from '../objects/TransactionSearchFilters'
import { GetEmptyTransaction } from '../objects/Transaction'

// separate this store in the future if needed

interface TransactionsState {
  loading: boolean,
  currentTransaction: Transaction,
  accounts: Array<Account>,
  categories: Array<Category>,
  currencies: Array<Currency>,
  transactions: Array<Transaction>
}

const initialState: TransactionsState = {
  loading: false,
  currentTransaction: GetEmptyTransaction(),
  accounts: [],
  categories: [],
  currencies: [],
  transactions: []
}

export const initTransactionStore = createAsyncThunk('transaction/initTransactionStore', async (parameters: TransactionSearchFilters) => {
      const transactionCall = TransactionService.SearchTransactions(parameters)
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

export const loadTransactions = createAsyncThunk('transaction/loadTransactions', async (parameters: TransactionSearchFilters) => {
  const transactionCall = TransactionService.SearchTransactions(parameters)

  return transactionCall.then((transactionsResponse) => { return transactionsResponse })
})

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactions: (state) => { state.transactions = [] },
    setCurrentTransaction: (state, action) => { state.currentTransaction = action.payload }
  },
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
export const selectCurrentTransaction = (state: RootState) => state.transactionStore.currentTransaction

export const { clearTransactions, setCurrentTransaction } = transactionSlice.actions

export default transactionSlice.reducer