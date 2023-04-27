import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {

  const { data, loading } = useQuery(ME)



  const recommended = useQuery(ALL_BOOKS, {
    variables: { genre: data ?  data.me.favoriteGenre : undefined }
  })
  
  if (loading || recommended.loading) return <div>loading...</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>books in your favorite genre {data.me.favoriteGenre}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            recommended.data.allBooks.map((book) => {
              return (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations