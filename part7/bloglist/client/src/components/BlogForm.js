import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleAddBlog}>
      <Form.Label>title: </Form.Label>
      <Form.Control
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        id='title-input'
      />
      <Form.Label>author: </Form.Label>
      <Form.Control
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        id='author-input'
      />
      <Form.Label>url: </Form.Label>
      <Form.Control
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        id='url-input'
      />
      <Button className='my-2' variant='success' id='create-button' type='submit'>create</Button>
    </Form>
  )
}

export default BlogForm