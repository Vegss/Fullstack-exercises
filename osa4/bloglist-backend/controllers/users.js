const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { error } = require('../utils/logger')


usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
  } catch (exception) {
    error(exception)
  }

})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Username is not unique'
    })
  }

  try {
    const user = new User({
      username: username,
      name: name,
      passwordHash
    })

    let savedUser = await user.save()
    response.status(201).json(savedUser)
    savedUser = await User.findOne({ username: savedUser.username })
  } catch (err) {
    error(err)
    response.status(400).json({
      error: 'Username is too short'
    })
  }
})


module.exports = usersRouter