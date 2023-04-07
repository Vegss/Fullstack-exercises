import { useDispatch, useSelector } from 'react-redux'
import { createComment, deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initializeUser } from '../reducers/userReducer'
import Comments from './Comments'
import { Button, Form, Table } from 'react-bootstrap'


const Blog = () => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const id = useParams().id

  const blog = useSelector((state) => state.blogs.find(b => b.id === id))
  const user = useSelector((state) => state.user)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete blog?')) dispatch(deleteBlog(id))
  }

  const addComment = async (e) => {
    e.preventDefault()
    dispatch(createComment(comment, id))
    setComment('')
  }

  if (!blog || !user) return <div>loading...</div>

  return (
    <div className='container my-5' data-testid='blog-details'>
      <h1>Blog Details</h1>
      <Table striped bordered>
        <tbody>
          <tr>
            <th>title and author</th>
            <td>{blog.title} </td>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <th>Url</th>
            <td><a href={blog.url}>{blog.url}</a></td>
          </tr>
          <tr>
            <th>likes</th>
            <td id='likes'>{blog.likes} </td>
            <td><Button onClick={() => handleLikes(blog)} id='like-button'>like</Button> </td>
          </tr>
          <tr>
            <th>Added by</th>
            <td>{blog.user.name}</td>
          </tr>
        </tbody>
      </Table>
      {
        blog.user.username === user.username &&
          <Button variant='danger' id='delete-button' onClick={() => handleDelete(blog.id)}>Delete</Button>
      }
      <Form onSubmit={addComment} className='mt-3'>
        <Form.Label>Add Comment</Form.Label>
        <Form.Control className='mb-3' value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button variant='success' type='submit'>add comment</Button>
      </Form>
      <Comments comments={blog.comments} />
    </div>
  )
}

export default Blog