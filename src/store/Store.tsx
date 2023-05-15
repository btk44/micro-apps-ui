import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import transactionReducer from './TransactionSlice'


const store = configureStore({
  reducer: {
    userStore: userReducer,
    transactionStore: transactionReducer  
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch