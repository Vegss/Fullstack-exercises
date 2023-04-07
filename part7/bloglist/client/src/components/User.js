import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {

  const id = useParams().id
  const dispatch = useDispatch()

  const user = useSelector((state) => state.users.find(user => user.id === id))

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!user) return <div>loading...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {
          user.blogs.map((blog) =>
            <li key={blog.id}>{blog.title}</li>
          )
        }
      </ul>
    </div>
  )
}

export default User