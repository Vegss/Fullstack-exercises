import personService from './services/Persons'
import { useEffect, useState } from 'react'
import './index.css'


const Notification = ({ notification }) => {
  if (notification === null){
    return null
  }
  const {message , cName} = notification
  return(
    <div className={cName}>
      {message}
    </div>
  )
}

const Filter = ({filterStr, handleFilterChange}) => {
  return(
  <form>
    <div>filter shown with <input value={filterStr} onChange={handleFilterChange}/></div>
  </form>
  )
}

const AddPerson = ({persons, setPersons, setMessage}) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const personObject = {
    name: newName,
    number: newNum
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const sameName = persons.find(person => person.name === newName)
    if (sameName !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(personObject, sameName.id)
        .then(response => {
          setPersons(persons.map(p => p.id === response.data.id ? response.data : p))
          setMessage({message:`Updated ${response.data.name}`, cName:'success'})
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }
    else{
      personService
      .create(personObject)
      .then(response => { 
        setPersons(persons.concat(response.data))
        setMessage({message:`Added ${response.data.name}`, cName:'success'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage({message: `${error.response.data.error}`, cName:'error'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNum('')
  }

  return(
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNum} onChange={handleNumChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Content = ({persons, deletePerson}) => {
  return(
    persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>)
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [filterStr, setFilterStr] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  },[])

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
      .remove(person.id)
      .then(() => {
        personService
        .getAll()
        .then(response => {
          setPersons(response.data)
          setMessage({message:`Deleted ${person.name}`, cName:'success'})
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      })
    }
  }

  const handleFilterChange = (event) => {
    setFilterStr(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={message}/>
        <Filter filterStr={filterStr} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>  
        <AddPerson persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      <h2>Numbers</h2>
        {
          filterStr === '' 
            ? <Content deletePerson={deletePerson} persons={persons}/> 
            : <Content deletePerson={deletePerson} persons={personsToShow}/>
        }
    </div>
  )
}

export default App