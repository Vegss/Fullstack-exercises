import axios from 'axios'
import { useEffect, useState } from 'react'

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

const Content = ({personsToShow}) => {
  return(
    personsToShow.map(person => 
      <p key={person.name}>{person.name} {person.number}</p>
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
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  },[])
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNum('')
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
        <Content personsToShow={personsToShow}/>
    </div>
  )

}

export default App