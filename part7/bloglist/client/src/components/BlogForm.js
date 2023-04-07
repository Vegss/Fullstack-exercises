import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (e) => {
    e.preventDefault()
    addBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const dispatch = useDispatch()

  const addBlog = async (newBlog) => {
    blogFormRef.current()
    dispatch(createBlog(newBlog))
  }

  return(
    <form onSubmit={handleAddBlog}>
      <label>title: </label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        id='title-input'
      /> <br/>
      <label>author: </label>
      <input
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        id='author-input'
      /> <br/>
      <label>url: </label>
      <input
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        id='url-input'
      /> <br/>
      <Button variant='success' id='create-button' type='submit'>create</Button>
    </form>
  )
}

export default BlogForm