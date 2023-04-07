import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogInfo from './components/BlogInfo'
import Users from './components/Users'
import User from './components/User'
import NavBar from './components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'


const App = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  if (!user.token) {
    return (
      <div className='d-flex justify-content-center'>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container bg-light'>
      <NavBar />
      <Notification />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<BlogInfo />} />
      </Routes>
    </div>
  )
}

export default App