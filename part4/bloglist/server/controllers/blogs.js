const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { author, title, url, likes, userId } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) return response.status(401).json({ error: 'Invalid token' })

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    author: author,
    title: title,
    url: url,
    likes: likes,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(blog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token
  const user = request.user
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!(token && decodedToken.id)) return response.status(401).json({ error: "token missing or invalid" })

  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog.user.toString() !== user.id.toString()) return response.status(401).json({ error: "unauthorized operation" })
  
  await Blog.deleteOne({ _id: id })
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body
  const updatedBlog = {
    author: author,
    title: title,
    url: url,
    likes: likes,
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(201).json(result)
})

module.exports = blogsRouter