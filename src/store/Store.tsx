import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import transactionReducer from './TransactionSlice'

const saveStoreToLocalStorage = (store: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem('appState', JSON.stringify(store.getState()));
    return result;
  };
};

const preloadStoreFromLocalStorage = () => {
  const storeStateString = localStorage.getItem('appState')
  if (storeStateString !== null) {
    return JSON.parse(storeStateString); 
  }
};

const store = configureStore({
  reducer: {
    userStore: userReducer,
    transactionStore: transactionReducer  
  },
  preloadedState: preloadStoreFromLocalStorage(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveStoreToLocalStorage)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch