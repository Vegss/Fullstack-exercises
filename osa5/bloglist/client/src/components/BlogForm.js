import { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({ setNotification, setBlogs, blogs, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogFormRef.current()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification({ message: `a new blog ${title} added`, type: 'success' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (err) {
      setNotification({ message: err.message, type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  return(
    <form onSubmit={addBlog}>
      <label>title: </label>
      <input 
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      /> <br/>
      <label>author: </label>
      <input 
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      /> <br/>
      <label>url: </label>
      <input 
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      /> <br/>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm