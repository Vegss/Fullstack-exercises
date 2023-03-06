import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const blogFormRef = useRef()


  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSONtoken = window.localStorage.getItem('userToken')
    const loggedUserJSONname = window.localStorage.getItem('username')

    if (loggedUserJSONtoken && loggedUserJSONname) {
      const user = JSON.parse(loggedUserJSONtoken)
      const username = JSON.parse(loggedUserJSONname)
      setUser(user)
      setUsername(username)
      blogService.setToken(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loggedUser = await loginService.login(username, password)
      setUser(loggedUser)
      window.localStorage.setItem('userToken', JSON.stringify(loggedUser.token))
      window.localStorage.setItem('username', JSON.stringify(loggedUser.username))
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

  const handleLikes = async (blog) => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const returnedBlog = await blogService.update(updatedBlog)
    const newBlogs = blogs.map(b => blog.id === b.id ? returnedBlog : b)
    setBlogs(newBlogs)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete blog?')) await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleUserChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  }
  if (!user) {
    return (
      <LoginForm
        notification={notification}
        handleLogin={handleLogin}
        handleUserChange={handleUserChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification.message} type={notification.type} />
      <p style={{ display: 'inline' }}>logged in as {username} </p>
      <button onClick={handleLogOut}>Log out</button>
      <div>
        <Togglable buttonLabel='create new note' ref={blogFormRef}>
          <h1>create new</h1>
          <BlogForm setNotification={setNotification} setBlogs={setBlogs} blogs={blogs} blogFormRef={blogFormRef}/>
        </Togglable>
      </div>
      {blogs.sort((a, b) => b.likes - a.likes ).map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} username={username}/>
      )}
    </div>
  )
}

export default App