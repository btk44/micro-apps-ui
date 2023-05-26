import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import transactionReducer, { transactionSliceFixComplexTypes } from './TransactionSlice'

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
    const state = JSON.parse(storeStateString)    
    transactionSliceFixComplexTypes(state.transactionStore)
    return state;
  }
};

// const dateTransform = createTransform(null, (outboundState) => {
//   return traverse(outboundState).map((val) => {
//       if (Time.isISOStringDate(val)) {
//           return new Date(val);
//       }

//       return val;
//   });
// });

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