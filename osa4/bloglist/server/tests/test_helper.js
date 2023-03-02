const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}