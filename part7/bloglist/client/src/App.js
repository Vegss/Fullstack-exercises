import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { initializeUser, logOut, setUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(setUser({ username, password }))
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current()
    dispatch(createBlog(newBlog))
  }

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete blog?')) dispatch(deleteBlog(id))
  }

  const handleUserChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleLogOut = () => dispatch(logOut())

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (!user.token) {
    return (
      <LoginForm
        notification={notification}
        handleLogin={handleLogin}
        handleUserChange={handleUserChange}
        handlePasswordChange={handlePasswordChange}
        username={user.username}
        password={user.password}
      />
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification.message} type={notification.type} />
      <p style={{ display: 'inline' }}>logged in as {user.username} </p>
      <button onClick={handleLogOut}>Log out</button>
      <div>
        <Togglable buttonLabel='create new note' ref={blogFormRef}>
          <h1>create new</h1>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
      </div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} username={user.username}/>
      )}
    </div>
  )
}

export default App