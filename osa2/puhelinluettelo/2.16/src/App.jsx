import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import personService from './services/persons'
import Notification from './components/notification'
import ErrorNotification from './components/errorNotification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [succesfulMessage, setSuccesfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${person.name} ?`)) {
      personService.deletion(id)
      .then(setPersons(persons.filter(person => person.id != id)))
      setSuccesfulMessage(`${person.name} Deleted succefully`)
      setTimeout( () => {
       setSuccesfulMessage(null)
      }, 5000)
      
    }
  }

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        personService.update(existingPerson.id, nameObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewName('');
            setNewNumber('');
            setSuccesfulMessage(`${newName} number changed successfully`);
            setTimeout(() => {
              setSuccesfulMessage(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(`${newName} was already deleted from the server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter(n => n.id !== existingPerson.id));
          });
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setSuccesfulMessage(`${newName} added successfully`);
          setTimeout(() => {
            setSuccesfulMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error(error.response.data); 
          setErrorMessage(error.response.data || 'An unexpected error occurred');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const filterPersons = persons.filter(person =>
   person.name.toLowerCase().includes(newFilter.toLowerCase())
  );


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={succesfulMessage} />
      <ErrorNotification message={errorMessage} />
      
      

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
      <Persons persons={filterPersons} handleDeletePerson={handleDeletePerson} />


      
    </div>
  )

}

export default App