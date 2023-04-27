import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    setToken(token)
  }, [])

  return (
    <div>
      <Router>
        <Link to='/'>Authors</Link>
        <Link to='/books'>Books</Link>
        {token &&
          <div style={{ display: 'inline' }}>
            <Link to='/add'>Add Book</Link>
            <button onClick={logout}>Logout</button>
          </div>
        } 
        {!token &&
          <Link to='/login'>Login</Link>  
        }

        <Routes>
          <Route path='/' element={<Authors />} />  
          <Route path='/books' element={<Books />} />
          {token && 
            <Route path='/add' element={<NewBook />} />
          }
          {
            !token &&
            <Route path='/login' element={<LoginForm setToken={setToken} />} />
          }
        </Routes>
      </Router>
    </div>
  )
}

export default App
