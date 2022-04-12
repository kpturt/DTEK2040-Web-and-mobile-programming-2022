const express = require('express')
const app = express()
app.use(express.static('build'))
const bodyParser = require('body-parser')
const { response, request } = require('express')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
mongo = require('mongodb') // unnecessary?

console.log('Starting server...')

// Fetch Persons from separate module
const Person = require('./models/person')

// Helper function to format person to be better suited for frontend with mongo
const formatPerson = (person) => {
    return {
        id: person._id,
        name: person.name,
        number: person.number
    }
}

// Generate new random id with Math.random
const generateId = () => {
    const newId = Math.floor(Math.random() * 100000 +1) 
    console.log("Generated new id: ", newId)
    return newId
}

// Add a new contact
app.post('/api/persons', (request, response) => {
    const body = request.body
    if(body.name === undefined) {
        console.log("error: name missing")
        return response.status(400).json({error: 'name missing'})
    }
    if(body.number === undefined) {
        console.log("error: number missing")
        return response.status(400).json({error: 'number missing'})
    }
    /*if( persons.map(person => person.name).includes(body.name) ) {
        console.log("error: person already exists")
        return response.status(400).json({error: 'person already added'})
    }*/
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })
    person
        .save()
        .then(savedPerson => {
            response.json(formatPerson(savedPerson))
            console.log(`adding person: ${person.name} number: ${person.number}`)
    })
    console.log("POST body :", body)
})

// Delete contact (_id important?)
app.delete('/api/persons/:id', (request, response) => {
    console.log("REQparams: ", request.params)    
    var id = request.params.id
    console.log("FDAFUFHUIS: ", request.params.id)
    Person
        .findByIdAndRemove(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformatted id'})
        })
})

// Display persons list
app.get('/api/persons', (req, res) => {
    //res.json(persons)
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
    })
})

// Get a single contact
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log("ID: ", id)
    Person
        .findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(formatPerson(person))
            } else {
                console.log('Person id not found, sending status code 404.')
                response.status(404).end()
            }
        })
        .catch(error => console.log(error))
    console.log(`GET id: ${id} name: ${Person.name}`) // logs wrong value
})

// Directory home display
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

// Logger function
const logger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}
app.use(logger)

// Error function
const error = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}
app.use(error)

// For Heroku
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// For local
/*const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})*/