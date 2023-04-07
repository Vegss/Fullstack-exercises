import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(setUser({ username, password }))
  }

  return (
    <div className='mt-5'>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control id='username' onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control id='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button className='mt-2' id='login-button' type='submit'>login</Button>
      </Form>
    </div>
  )
}

export default LoginForm