const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Test1',
    author: 'John',
    url: 'http://test1.com',
    likes: 1
  },
  {
    title: 'Test2',
    author: 'Tommy',
    url: 'http://test2.com',
    likes: 4
  },
  {
    title: 'Test3',
    author: 'Tim',
    url: 'http://test3.com',
    likes: 5
  },
  {
    title: 'Test4',
    author: 'John',
    url: 'http://test4.com',
    likes: 10
  }
]

const initialUsers = [
  {
    username: 'John123',
    password: 'password',
    name: 'John', 
  },
  {
    username: 'Tim3123',
    password: 'password123',
    name: 'Tim'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}