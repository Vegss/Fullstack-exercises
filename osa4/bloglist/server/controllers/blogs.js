const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { author, title, url, likes } = request.body
  const newBlog = new Blog({
    author: author,
    title: title,
    url: url,
    likes: likes
  })
  const blog = await newBlog.save()
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