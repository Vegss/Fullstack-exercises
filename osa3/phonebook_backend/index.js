const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523" 
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    }
  ]

  app.use(express.json())
  app.use(morgan('tiny'))
  app.use(cors())

  app.get('/info', (req, res) => {
    const current = Date()
    res.send(`<p>Phonebool has info for ${persons.length} people</p><p>${current}</p>`)
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
      res.json(person)
    } else {
      res.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    const person = req.body
    if (!person.number) {
      return res.status(400).json({
        error: 'Person must have a number'
      })
    }
    if (!person.name){
      return res.status(400).json({
        error: 'Person must have a name'
      })
    }
    if (persons.filter(p => p.name === person.name).length > 0){
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
    person.id = Math.floor(Math.random() * 1000)
    persons.concat(person)
    res.json(person)
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)