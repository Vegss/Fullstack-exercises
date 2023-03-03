const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { author, title, url, likes, userId } = request.body

  if (!userId) return response.status(400).json({ error: "No userId given." })

  const user = await User.findById(userId)

  const blog = new Blog({
    author: author,
    title: title,
    url: url,
    likes: likes,
    user: user
  })

  console.log(blog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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