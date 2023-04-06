import { useState } from 'react'


const Blog = ({ blog, handleLikes, username, handleDelete }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonText = view ? 'hide' : 'view'

  if (!view) {
    return (
      <div style={blogStyle}>
        <span className='title'>{blog.title} </span>
        <span className='author'>{blog.author}</span>
        <button className='view' onClick={() => setView(!view)} >{buttonText}</button>
      </div>
    )
  }
  return (
    <div style={blogStyle} data-testid='blog-details'>
      <span>{blog.title} </span>
      <span>{blog.author}</span>
      <button onClick={() => setView(!view)} >{buttonText}</button> <br/>
      <p>{blog.url}</p>
      <span id='likes'>{blog.likes} </span>
      <button onClick={() => handleLikes(blog)} id='like-button' >like</button> <br/>
      <p>{blog.user.name}</p>
      {blog.user.username === username &&
        <button id='delete-button' style={{ background: 'red' }} onClick={() => handleDelete(blog.id)}>Delete</button>
      }
    </div>
  )
}

export default Blog