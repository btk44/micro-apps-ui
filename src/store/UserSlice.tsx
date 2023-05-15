import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './Store'

interface UserState {
    ownerId: number,
    token: string
}

const initialState: UserState = {
    ownerId: 1,
    token: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    load: () => { /* do nothing for now */ }
  }
})

// Action creators are generated for each case reducer function
export const { load } = userSlice.actions
export const selectOwnerId = (state: RootState) => state.userStore.ownerId
export const selectToken = (state: RootState) => state.userStore.token
export default userSlice.reducer