import personService from './services/Persons'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filterStr, handleFilterChange}) => {
  return(
  <form>
    <div>filter shown with <input value={filterStr} onChange={handleFilterChange}/></div>
  </form>
  )
}

const AddPerson = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
      <div>number: <input value={props.newNum} onChange={props.handleNumChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Person = ({person, deletePerson, personsToShow}) => {
  return(
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name, personsToShow)}>delete</button>
    </div>
)}

const Content = ({personsToShow, deletePerson}) => {
  return(
    personsToShow.map(person =>
      <Person key={person.id} person={person} deletePerson={deletePerson} personsToShow={personsToShow} />
    )
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterStr, setFilterStr] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  },[])

  const deletePerson = (event, person) => {

    if (window.confirm(`Delete ${person.name}`)) {
      axios
      .delete(`http://localhost:3001/persons/${person.id}`)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        personsToShow = showAll 
          ? persons 
          : persons.filter(person => person.name.toLowerCase().includes(filterStr))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const sameNames = persons.filter(person => person.name === newName)
    if (sameNames.length > 0) {
      return(alert(`${newName} is already added to phonebook`))
    }

    const personObject = {
      name: newName,
      number: newNum
    }
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterStr(event.target.value)
    if (filterStr.length > 0) {
      setShowAll(false)
    }
    else{ 
      setShowAll(true)
    }
  } 

  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filterStr))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterStr={filterStr} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>  
        <AddPerson newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
        <Content personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App