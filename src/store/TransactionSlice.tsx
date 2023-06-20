import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionService } from '../services/TransactionService'
import { Account } from '../objects/Account'
import { Category } from '../objects/Category'
import { Currency } from '../objects/Currency'
import { Transaction } from '../objects/Transaction'
import { RootState } from './Store'
import { TransactionSearchFilters } from '../objects/TransactionSearchFilters'
import { GetEmptyTransaction } from '../objects/Transaction'
import { CategoryType } from '../objects/CategoryType'

// separate this store in the future if needed

interface TransactionsState {
  loading: boolean,
  currentTransaction: Transaction,
  accounts: { [key: number]: Account },
  categories:  { [key: number]: Category },
  currencies:  { [key: number]: Currency },
  transactions: Array<Transaction>,
  categoryTypes:  { [key: number]: CategoryType }
}

const initialState: TransactionsState = {
  loading: false,
  currentTransaction: GetEmptyTransaction(),
  accounts: [],
  categories: [],
  currencies: [],
  transactions: [],
  categoryTypes: []
}

export const initTransactionStore = createAsyncThunk('transaction/initTransactionStore', async (parameters: TransactionSearchFilters) => {
      const transactionCall = TransactionService.SearchTransactions(parameters)
      const accountsCall = TransactionService.SearchAccounts({ownerId: parameters.ownerId})
      const categoryCall = TransactionService.SearchCategories({ownerId: parameters.ownerId})
      const currencyCall = TransactionService.SearchCurrencies()
      const categoryTypesCall = TransactionService.GetCategoryTypes()

      return Promise
        .all([transactionCall, accountsCall, categoryCall, currencyCall, categoryTypesCall])
        .then(([transactionsResponse, accountsResponse, categoriesResponse, currencyResponse, categoryTypesResponse]) => {
          const accountsDict: any = Object.assign({}, ...accountsResponse.map((x: Account) => ({[x.id]: x})));
          const flattenCategories = categoriesResponse.concat(categoriesResponse.flatMap((x: Category) => x.subcategories))
          const categoriesDict: any = Object.assign({}, ...flattenCategories.map((x: Category) => ({[x.id]: x})));
          const currenciesDict: any = Object.assign({}, ...currencyResponse.map((x: Currency) => ({[x.id]: x})));
          const categoryTypesDict: any = Object.assign({}, ...categoryTypesResponse.map((x: CategoryType) => ({[x.id]: x})));
          return { accounts: accountsDict, categories: categoriesDict, transactions: transactionsResponse, 
            currencies: currenciesDict, categoryTypes: categoryTypesDict }
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
      state.categoryTypes = action.payload.categoryTypes
    })
    builder.addCase(loadTransactions.pending, (state: TransactionsState) => { state.loading = true })
    builder.addCase(loadTransactions.rejected, (state: TransactionsState) => { state.loading = false })
    builder.addCase(loadTransactions.fulfilled, (state: TransactionsState, action) => { 
      state.transactions = state.transactions.concat(action.payload) 
    })
  }
})

export const saveTransactionStoreStateToLocalStorage = (action: any) => {
    if(action.type === 'transaction/setCurrentTransaction'){
      localStorage.setItem('currentTransaction', JSON.stringify(action.payload));
    }

    if(action.type === 'transaction/initTransactionStore/fulfilled'){
      localStorage.setItem('transactions', JSON.stringify(action.payload.transactions));
      localStorage.setItem('accounts', JSON.stringify(action.payload.accounts));
      localStorage.setItem('categories', JSON.stringify(action.payload.categories));
      localStorage.setItem('categoryTypes', JSON.stringify(action.payload.categoryTypes));
      localStorage.setItem('currencies', JSON.stringify(action.payload.currencies));
    }

    if(action.type === 'transaction/loadTransactions/fulfilled'){
      localStorage.setItem('transactions', JSON.stringify(action.payload));
    }
}

export const loadTransactionStoreStateFromLocalStorage = () : TransactionsState => {
  const state : TransactionsState = structuredClone(initialState)

  const currentTransactionString = localStorage.getItem('currentTransaction')
  if (currentTransactionString !== null) {
    const currentTransaction: Transaction = JSON.parse(currentTransactionString)
    currentTransaction.date = new Date(currentTransaction.date)
    state.currentTransaction = currentTransaction
  }

  const accountsString = localStorage.getItem('accounts')
  if (accountsString !== null) {
    state.accounts = JSON.parse(accountsString)
  }

  const categoriesString = localStorage.getItem('categories')
  if (categoriesString !== null) {
    state.categories = JSON.parse(categoriesString)
  }

  const currenciesString = localStorage.getItem('currencies')
  if (currenciesString !== null) {
    state.currencies = JSON.parse(currenciesString)
  }

  const categoryTypesString = localStorage.getItem('categoryTypes')
  if (categoryTypesString !== null) {
    state.categoryTypes = JSON.parse(categoryTypesString)
  }

  const transactionsString = localStorage.getItem('transactions')
  if (transactionsString !== null) {
    const transactions: Transaction[] = JSON.parse(transactionsString)
    transactions.forEach(transaction => {
      transaction.date = new Date(transaction.date)
      if(transaction.groupTransactions?.length){
        transaction.groupTransactions.forEach(gTransaction => { gTransaction.date = new Date(gTransaction.date) })
      }
    })
    state.transactions = transactions
  }

  return state
}

export const selectAccounts = (state: RootState) => state.transactionStore.accounts
export const selectCategories = (state: RootState) => state.transactionStore.categories
export const selectCurrencies = (state: RootState) => state.transactionStore.currencies
export const selectTransactions = (state: RootState) => state.transactionStore.transactions
export const selectCurrentTransaction = (state: RootState) => state.transactionStore.currentTransaction
export const selectCategoryTypes = (state: RootState) => state.transactionStore.categoryTypes

export const { clearTransactions, setCurrentTransaction } = transactionSlice.actions

export default transactionSlice.reducer