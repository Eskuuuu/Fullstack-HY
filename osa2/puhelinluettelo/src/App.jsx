import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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