import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = () => {
  const [birthyear, setBirthyear] = useState('')
  const [name, setName] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  if (authors.loading) return <div>loading...</div>

  const updateBirthyear = (e) => {
    e.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(birthyear) } })

    setBirthyear('')
    setName('')
  } 

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={updateBirthyear}>

          <label>name</label>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {
              authors.data.allAuthors.map((author) => <option key={author.name}>{author.name}</option>)
            }
          </select><br/>
          <label>born</label>
          <input
            type='number'
            onChange={({ target }) => setBirthyear(target.value)}
            value={birthyear}
          /><br/>

          <button type='submit'>update author</button>

        </form>
      </div>
    </div>
  )
}

export default Authors
