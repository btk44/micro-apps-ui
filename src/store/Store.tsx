import { configureStore } from '@reduxjs/toolkit'
import userReducer, { loadUserStoreFromLocalStorage, saveUserStoreStateToLocalStorage } from './UserSlice'
import transactionReducer, { saveTransactionStoreStateToLocalStorage, loadTransactionStoreStateFromLocalStorage } from './TransactionSlice'

export const storeLocalStorageKey = 'expense-tracker'

const saveStoreToLocalStorage = () => {
  return (next: any) => (action: any) => {
    const result = next(action);
    saveTransactionStoreStateToLocalStorage(action)
    saveUserStoreStateToLocalStorage(action)
    return result;
  };
};

const preloadStoreFromLocalStorage = () => {
  return {
    transactionStore: loadTransactionStoreStateFromLocalStorage(),
    userStore: loadUserStoreFromLocalStorage()
  }
};

const store = configureStore({
  reducer: {
    userStore: userReducer,
    transactionStore: transactionReducer
  },
  preloadedState: preloadStoreFromLocalStorage(),
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(saveStoreToLocalStorage)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
