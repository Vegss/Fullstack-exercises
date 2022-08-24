import personService from './services/Persons'
import { useEffect, useState } from 'react'

// Filter form
const Filter = ({filterStr, handleFilterChange}) => {
  return(
  <form>
    <div>filter shown with <input value={filterStr} onChange={handleFilterChange}/></div>
  </form>
  )
}

// Adding person form
const AddPerson = ({persons, setPersons}) => {
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
        })
      }
    }
    else{
      personService
      .create(personObject)
      .then(response => setPersons(persons.concat(response.data)))
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
        <Filter filterStr={filterStr} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>  
        <AddPerson persons={persons} setPersons={setPersons} />
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