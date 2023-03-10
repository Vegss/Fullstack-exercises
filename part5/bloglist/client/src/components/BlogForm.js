import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
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
      <button id='create-button' type='submit'>create</button>
    </form>
  )
}

export default BlogForm