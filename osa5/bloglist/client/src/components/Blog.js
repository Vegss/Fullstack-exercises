import { useState } from "react"


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
        <p style={{ display: 'inline' }}>{blog.title} {blog.author} </p>
        <button onClick={() => setView(!view)} >{buttonText}</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <p style={{ display: 'inline' }}>{blog.title} {blog.author} </p>
      <button onClick={() => setView(!view)} >{buttonText}</button> <br/>
      <p>{blog.url}</p>
      <p style={{ display: 'inline' }}>{blog.likes} </p>
      <button onClick={() => handleLikes(blog)} >like</button> <br/>
      <p>{blog.user.name}</p>
      {blog.user.name === username && 
        <button style={{background: "red"}} onClick={() => handleDelete(blog.id)}>Delete</button>
      }
    </div>
  )
}

export default Blog