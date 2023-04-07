import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!users) return <div>loading...</div>

  return (
    <div>
      <h1>Users</h1>
      <Table responsive hover bordered>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) =>
              <tr key={user.id}>
                <td align='center'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}


export default Users