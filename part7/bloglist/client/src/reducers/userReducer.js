import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const initialState = { token: '', username: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSONtoken = window.localStorage.getItem('userToken')
    const loggedUserJSONname = window.localStorage.getItem('username')

    if (loggedUserJSONtoken && loggedUserJSONname) {
      const userToken = JSON.parse(loggedUserJSONtoken)
      const username = JSON.parse(loggedUserJSONname)
      dispatch(set({ token: userToken, username: username }))
      blogService.setToken(userToken)
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    try {
      const loginResponse = await loginService.login(user.username, user.password)
      window.localStorage.setItem('userToken', JSON.stringify(loginResponse.token))
      window.localStorage.setItem('username', JSON.stringify(loginResponse.username))
      dispatch(set({ token: loginResponse.token, user: loginResponse.username }))
      dispatch(createNotification('Login successful', 'success'))
    } catch (err) {
      dispatch(createNotification(err.response.data.error, 'error'))
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(set(initialState))
  }
}

export const { set } = userSlice.actions

export default userSlice.reducer