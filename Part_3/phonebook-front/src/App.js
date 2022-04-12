import React from 'react'
import Persons from './components/Persons'
import personService from './services/persons'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newPerson: '',
      newNumber: '',
      error: null
    }
    console.log('constructor')
  }

//-----------------------------------------------------------------------------------------------------------------
// Backside of the app

  // allows to execute React node when the component is already placed in the DOM
  componentDidMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  // event handler for adding persons
  addPerson = (event, id) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newPerson,
      id: this.state.persons.length + 1,
      number: this.state.newNumber
    }

    //      iterates persons     value        return       returnvalue includes
    if( this.state.persons.map(personX => personX.name).includes(personObject.name) ){
      console.log( `Contact "${personObject.name}" already in phonebook:`, this.state.persons.map(personObject => personObject.name).includes(personObject.name) )
      console.log('Sending alert of duplicate contact:')
      //alert(`Henkilö "${personObject.name}" on jo puhelinluettelossa!`)
      this.setState({
        error: `Henkilö "${personObject.name}" on jo puhelinluettelossa!`,
        persons: this.state.persons.filter(n => n.id !== id),
        newPerson: '',
        newNumber: ''
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
      return
    }

    // called in componentDidMount
    personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newPerson: '',
          newNumber: ''
        })
      })
    console.log('Contact added.')
    //console.log('A',event.target)
  }

  // function for deleting contacts
  deleteContact = (id, event) => {
    const url = `${baseUrl}/${id}`
    const person = this.state.persons.find(n => n.id === id)
    console.log(`Sending alert of deleting contact "${person.name}":`)
    const permPerson = person.name
    if (!window.confirm(`Haluatko poistaa henkilön "${person.name}" puhelinluettelosta?`)) {
      console.log(`The deletion of "${person.name}" cancelled.`)
      return
    }
    axios //Sends HTTP DELETE request
      .delete(url, person)
      .then(response => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== id)
        })
        console.log(`Contact "${permPerson}" deleted.`)
      })
  }
  
  handlePersonChange = (event) => {
    //console.log('B',event.target.value)
    this.setState({ newPerson: event.target.value })
  }

  handleNumberChange = (event) => {
    //console.log('C',event.target.value)
    this.setState({ newNumber: event.target.value })
  }

//-----------------------------------------------------------------------------------------------------------------
// Frontside of the app
  render() {
    console.log('rendering')

    return (
    <div>
      <div>
        <Notification message={this.state.error}/>
        <h1>Puhelinluettelo</h1>
        <form onSubmit={this.addPerson}>
          
          <div>
          Nimi: <br></br>  
          <input
            value={this.state.newPerson}
            onChange={this.handlePersonChange}
          />
          </div>

          <div>
            Numero: <br></br>
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>

          <div className="saveButtonDiv">
            <button className="saveButton" type="submit">tallenna</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numerot</h2>
        <table>
          <Persons
            key={this.state.id}
            persons={this.state.persons}
            onDeleteContact={this.deleteContact}
          />
        </table>
      </div>
    </div>
    )
  }
}

// method for sending notifications
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App