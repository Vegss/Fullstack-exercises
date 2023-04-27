import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      navigate('/')
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username: name, password }})
  }

  return (
    <form onSubmit={handleLogin}>
      <label>name</label>
      <input value={name} onChange={({ target }) => setName(target.value)} /><br/>
      <label>password</label>
      <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} /><br/>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm