import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios 
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  },[])

  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    }
  }

  const filterPersons = persons.filter(person =>
   person.name.toLowerCase().includes(newFilter.toLowerCase())
  );


  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />


      
    </div>
  )

}

export default App