const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { response, request } = require('express')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

console.log('Starting server...')

// Hardcoded persons list
let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Martti Tienari",
      number: "040-123456",
      id: 2
    },
    {
      name: "Arto Järvinen",
      number: "040-123456",
      id: 3
    },
    {
      name: "Lea Kutvonen",
      number: "040-123456",
      id: 4
    }
  ]

// Generate new random id with Math.random
const generateId = () => {
    const newId = Math.floor(Math.random() * 100000 +1) 
    console.log("Generated new id: ", newId)
    return newId
}

// REST requests ------------------------------------------------------------------
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
    if( persons.map(person => person.name).includes(body.name) ) {
        console.log("error: person already exists")
        return response.status(400).json({error: 'person already added'})
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
    console.log("POST body :", body)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    } else {
        console.log('Person id not found, sending status code 404.')
        response.status(404).end()
    }
    console.log(`GET id: ${id} name: ${person.name}`)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    console.log("DELETE id: ", id)
})
// REST requests ------------------------------------------------------------------

// Directory home display
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

// Display persons list
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Logger function
const logger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}
const error = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}
app.use(logger)
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