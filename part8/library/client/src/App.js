import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <Router>
        <Link to='/'>Authors</Link>
        <Link to='/books'>Books</Link>
        <Link to='/add'>Add Book</Link>

        <Routes>
          <Route path='/' element={<Authors />} />  
          <Route path='/books' element={<Books />} />
          <Route path='/add' element={<NewBook />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
