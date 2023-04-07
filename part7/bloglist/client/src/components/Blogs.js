import React, { useRef } from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

const Blogs = () => {

  const blogFormRef = useRef()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className='container my-3'>
      <div className='my-3'>
        <Togglable buttonLabel='create new note' ref={blogFormRef}>
          <h1>create new</h1>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map(blog => {
            return (
              <tr key={blog.id}>
                <Blog blog={blog} username={user.username}/>
              </tr>
            )
          }
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs