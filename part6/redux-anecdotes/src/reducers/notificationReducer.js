import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state='', action) {
      state = action.payload
      return state
    },
    clearNotification(state='', action) {
      state = ''
      return state
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, duration) => {
  return async dispatch => {
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration*1000);
  }
}

export default notificationSlice.reducer