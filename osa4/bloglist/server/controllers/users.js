const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (password.length < 3) return response.status(400).json({ error: 'Password must be at least 3 characters' })
  if (await User.findOne({ username: username } )) return response.status(400).json({ error: 'Username must be unique' })

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter