const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const { tokenExtractor } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)


module.exports = app