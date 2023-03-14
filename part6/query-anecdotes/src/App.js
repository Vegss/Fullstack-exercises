import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import {  useReducer } from 'react'
import NotificationContext from './components/NotificationContext'


const notificationReducer = (state='', action) => {
  switch (action.type) {
    case 'SET':
      state = action.payload.notification
      return state
    case 'CLEAR':
      state = ''
      return state
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1 })
    notificationDispatch({ type: 'SET', payload: {
      notification: `anecdote '${anecdote.content}' voted`
    }})
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if ( result.isLoading ) return <div>loading data...</div>
  if ( result.isError ) return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
