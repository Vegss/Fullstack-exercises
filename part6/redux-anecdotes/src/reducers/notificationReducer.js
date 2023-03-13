import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state='', action) {
      state = action.payload
      return state
    },
    unsetNotification(state='', action) {
      state = ''
      return state
    }
  }
  
})

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer