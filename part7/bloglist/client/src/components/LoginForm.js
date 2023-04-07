import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { useState } from 'react'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(setUser({ username, password }))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input id='username' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input id='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm