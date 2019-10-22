const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
]

app.get('/', (request, response) => {

})

app.get('/info', (request, response) => {
    console.log(`GET: Get info...`)

    const info =
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>`

    response.send(info)
})

app.get('/api/persons', (request, response) => {
    console.log(`GET: Get persons...`)
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(`GET: Getting a person on id: ${id}...`)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    else { response.status(404).end() }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(`DELETE: Deleting a person on id: ${id}...`)

    if (!persons.find(person => person.id === id)) {
        console.log(`Attempted to delete non-existent id ${id}`)
        response.status(404).end
        return
    }

    persons = persons.filter(person => person.id !== id)
    console.log(`Deleted id ${id}`)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    console.log('POST: Creating new person...')
    const body = request.body
    console.log(body)

    if (!body.name) {
        console.log(`Name Missing`)
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        console.log(`Number Missing`)
        return response.status(400).json({
            error: 'Number missing'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        console.log(`Person already exists`)
        return response.status(400).json({
            error: 'Person already exists'
        })
    }

    const id = Math.floor(Math.random() * 10000)

    const person = {
        name: body.name,
        number: body.number,
        id: id
    }

    console.log('Created person:')
    console.log(person)

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})