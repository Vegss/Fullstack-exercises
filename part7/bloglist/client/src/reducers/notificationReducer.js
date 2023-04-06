import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  message: '',
  type: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
      return state
    },
    clearNotification() {
      return initialState
    }
  }
})


export const createNotification = (message, type) => {
  return (dispatch) => {
    dispatch(setNotification({ message: message, type: type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}


export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer