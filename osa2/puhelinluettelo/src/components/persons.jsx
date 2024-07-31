const Persons = (props) => {
    return(
    <ul>
    {props.persons.map( person =>
      <p key={person.name}> {person.name} {person.number}</p>
    )}
    </ul>
  )}

export default Persons