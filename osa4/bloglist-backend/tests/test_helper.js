const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersAtStart = [
  {
    username: 'User1',
    name: 'User1',
    password: 'password1'
  },
  {
    username: 'User2',
    name: 'User2',
    password: 'password2'
  },
  {
    username: 'User3',
    name: 'User3',
    password: 'password3'
  }
]

const blogsInDatabase = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  blogsAtStart,
  blogsInDatabase,
  usersAtStart,
  usersInDatabase
}