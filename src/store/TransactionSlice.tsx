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

const transactionSliceName = 'transaction'

interface TransactionsState {
  loading: boolean,
  currentTransaction: Transaction,
  accounts: { [key: number]: Account },
  categories:  { [key: number]: Category },
  currencies:  { [key: number]: Currency },
  transactions: Array<Transaction>,
  categoryTypes:  { [key: number]: CategoryType },
  [index: string]: any;
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

export const initTransactionStore = createAsyncThunk(transactionSliceName + '/initTransactionStore', async (ownerId: number) => {
      //const transactionCall = TransactionService.SearchTransactions(parameters)
      const accountsCall = TransactionService.SearchAccounts({ownerId: ownerId})
      const categoryCall = TransactionService.SearchCategories({ownerId: ownerId})
      const currencyCall = TransactionService.SearchCurrencies()
      const categoryTypesCall = TransactionService.GetCategoryTypes()

      return Promise
        .all([/*transactionCall,*/ accountsCall, categoryCall, currencyCall, categoryTypesCall])
        .then(([/*transactionsResponse,*/ accountsResponse, categoriesResponse, currencyResponse, categoryTypesResponse]) => {
          const accountsDict: any = Object.assign({}, ...accountsResponse.map((x: Account) => ({[x.id]: x})));
          const flattenCategories = categoriesResponse.concat(categoriesResponse.flatMap((x: Category) => x.subcategories))
          const categoriesDict: any = Object.assign({}, ...flattenCategories.map((x: Category) => ({[x.id]: x})));
          const currenciesDict: any = Object.assign({}, ...currencyResponse.map((x: Currency) => ({[x.id]: x})));
          const categoryTypesDict: any = Object.assign({}, ...categoryTypesResponse.map((x: CategoryType) => ({[x.id]: x})));
          return { accounts: accountsDict, categories: categoriesDict, transactions: [] /*transactionsResponse*/, 
            currencies: currenciesDict, categoryTypes: categoryTypesDict }
        })
})

export const loadTransactions = createAsyncThunk(transactionSliceName + '/loadTransactions', async (parameters: TransactionSearchFilters) => {
  const transactionCall = TransactionService.SearchTransactions(parameters)

  return transactionCall.then((transactionsResponse) => { return transactionsResponse })
})

export const transactionSlice = createSlice({
  name: transactionSliceName,
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

export const selectAccounts = (state: RootState) => state.transactionStore.accounts
export const selectCategories = (state: RootState) => state.transactionStore.categories
export const selectCurrencies = (state: RootState) => state.transactionStore.currencies
export const selectTransactions = (state: RootState) => state.transactionStore.transactions
export const selectCurrentTransaction = (state: RootState) => state.transactionStore.currentTransaction
export const selectCategoryTypes = (state: RootState) => state.transactionStore.categoryTypes

export const { clearTransactions, setCurrentTransaction } = transactionSlice.actions

export default transactionSlice.reducer

// LOCAL STORAGE:

export const saveTransactionStoreStateToLocalStorage = (action: any) => {
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  if(setCurrentTransaction.match(action)){
    saveToLocalStorage('currentTransaction', action.payload);
  }

  if(initTransactionStore.fulfilled.match(action)){
    saveToLocalStorage('transactions', action.payload.transactions);
    saveToLocalStorage('accounts', action.payload.accounts);
    saveToLocalStorage('categories', action.payload.categories);
    saveToLocalStorage('categoryTypes', action.payload.categoryTypes);
    saveToLocalStorage('currencies', action.payload.currencies);
  }

  // if(loadTransactions.fulfilled.match(action)){
  //   const transactions = []
  //   const existingTransactionsString = localStorage.getItem('transactions')
  //   if(existingTransactionsString != null)
  //     transactions.push(...JSON.parse(existingTransactionsString))

  //   transactions.push(...action.payload)
  //   saveToLocalStorage('transactions', transactions);
  // }
}

export const loadTransactionStoreStateFromLocalStorage = () : TransactionsState => {
  const state : TransactionsState = structuredClone(initialState)
  const loadFromLocalStorage = (key: string, additionalActionOnValue: any = null) => {
    const localStorageString = localStorage.getItem(key)
    if (localStorageString !== null) {
      const value = JSON.parse(localStorageString)
      if(additionalActionOnValue !== null)
        additionalActionOnValue(value)
      state[key] = value
    }
  }

  loadFromLocalStorage('currentTransaction', (transaction: Transaction) => {
    transaction.date = new Date(transaction.date)
  })
  loadFromLocalStorage('accounts')
  loadFromLocalStorage('categories')
  loadFromLocalStorage('categoryTypes')
  loadFromLocalStorage('currencies')
  // loadFromLocalStorage('transactions', (transactions: Transaction[]) => {
  //   transactions.forEach(transaction => {
  //     transaction.date = new Date(transaction.date)
  //     if(transaction.groupTransactions?.length){
  //       transaction.groupTransactions.forEach(gTransaction => { gTransaction.date = new Date(gTransaction.date) })
  //     }
  //   })
  // })

  return state
}