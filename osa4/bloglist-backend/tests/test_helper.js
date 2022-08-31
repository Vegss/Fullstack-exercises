const Blog = require('../models/blog')

const blogsAtStart = [
  {
    title: 'Blog',
    author: 'John',
    url: 'www.johnsblog.com',
    likes: 10
  },
  {
    title: 'Test',
    author: 'Tester',
    url: 'www.test.com',
    likes: 100
  },
  {
    title: 'update',
    author: 'upi',
    url: 'www.update.com',
    likes: 80
  }
]

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogsAtStart,
  blogsInDatabase
}