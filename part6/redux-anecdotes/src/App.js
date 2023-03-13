import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  if (notification) {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Notification />
        <AnecdoteList />
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App