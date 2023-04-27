import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import React, { useEffect, useState } from 'react'



const Books = () => {
  const [genres, setGenres] = useState()
  const [genre, setGenre] = useState(undefined)
  const [toShow, setToShow] = useState()

  const booksByGenre = useQuery(ALL_BOOKS, {
    variables: { genre: genre }
  })

  useEffect(() => {
    if (booksByGenre.loading) return
    const allGenres = []
    booksByGenre.data.allBooks.map((book) => 
      book.genres.map((genre) => allGenres.push(genre))
    )
    const uniqueGenres = new Set(allGenres)
    setGenres([...uniqueGenres, 'All Genres'])
    setToShow(booksByGenre.data.allBooks)
  }, [booksByGenre]) // eslint-disable-line

  const changeGenre = (genre) => {
    const newGenre = genre !== 'All Genres' ? genre : undefined
    if (newGenre !== undefined) booksByGenre.refetch({ genre })
    setGenre(newGenre)
  }

  if (booksByGenre.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>
      <h2>By genre {genre === undefined ? 'All Genres' : genre}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { toShow &&
            toShow.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'inline' }}>
        { genres &&
          genres.map((genre) => 
            <button key={genre} onClick={() => changeGenre(genre)}>{genre}</button>
          )
        }
      </div>
    </div>
  )
}

export default Books