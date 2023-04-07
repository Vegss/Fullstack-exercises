import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(set(users))
  }
}


export const { set } = userSlice.actions

export default userSlice.reducer