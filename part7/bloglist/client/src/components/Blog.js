import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

  return (
    <td>
      <Link to={`/blogs/${blog.id}`}>
        <span className='title'>{blog.title} </span>
        <span className='author'>{blog.author}</span>
      </Link>
    </td>
  )
}

export default Blog