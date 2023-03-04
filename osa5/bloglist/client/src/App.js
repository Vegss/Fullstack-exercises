import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')


  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loggedUser = await loginService.login(username, password)
      setUser(loggedUser)
      window.localStorage.setItem('user', JSON.stringify(loggedUser.token))
      blogService.setToken(loggedUser.token)
      setNotification({ message: 'Login successful', type: 'success' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (err) {
      setNotification({ message: err.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            <label>Password</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification.message} type={notification.type} />
      <p style={{display: 'inline'}}>logged in as {username} </p>
      <button onClick={handleLogOut}>Log out</button>
      <div>
        <BlogForm setNotification={setNotification} setBlogs={setBlogs} blogs={blogs} />
      </div>
      {blogs.map(blog =>
        <p key={blog.id}>{blog.title} {blog.author}</p>
      )}
    </div>
  )
}

export default App