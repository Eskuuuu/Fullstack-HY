
const Persons = (props) => {
    return(
    <ul>
    {props.persons.map( person =>
      <p key={person.name}> {person.name} {person.number} <button onClick={ () => props.handleDeletePerson(person.id)}>delete</button></p>
      
    )}
    </ul>
  )}

export default Persons