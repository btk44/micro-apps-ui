import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import transactionReducer, { transactionSliceFixComplexTypes } from './TransactionSlice'

export const storeLocalStorageKey = 'AppState'

const saveStoreToLocalStorage = (store: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem(storeLocalStorageKey, JSON.stringify(store.getState()));
    return result;
  };
};

const preloadStoreFromLocalStorage = () => {
  const storeStateString = localStorage.getItem(storeLocalStorageKey)
  if (storeStateString !== null) {
    const state = JSON.parse(storeStateString)    
    transactionSliceFixComplexTypes(state.transactionStore)
    return state;
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
