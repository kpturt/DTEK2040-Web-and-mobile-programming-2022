import React from 'react'

const Persons = ({ persons, onDeleteContact }) => {
    return(
        <thead>
            {persons.map(person => <Person key={person.id} person={person} onDeleteContact={onDeleteContact} />)}
        </thead>
    )
  }

const Person = ({ person, onDeleteContact }) => {
    return(
        <tr>
            <th>{person.name}</th>
            <th>{person.number}</th>
            <th><button className="deleteButton" onClick={(event) => onDeleteContact(person.id, event)}>poista</button></th>
        </tr>
    )
}

export default Persons