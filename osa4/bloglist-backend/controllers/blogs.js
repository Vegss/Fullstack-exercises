const blogsRouter = require('express').Router()
const { error } = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.delete('/', async (request, response) => {
  try{
    await User.deleteMany({})
    await Blog.deleteMany({})
    response.json('deleted')
  } catch(err){
    error(err)
  }
})

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.title || !body.url){
    return response.status(400).end()
  }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }  catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(200).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter