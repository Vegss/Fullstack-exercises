import React from 'react'
import { Table } from 'react-bootstrap'

const Comments = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <Table bordered hover>
        <tbody>
          {
            comments.map((comment) => {
              return (
                <tr key={comment}>
                  <td>{comment}</td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Comments