const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json and have the correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('_id is set to be id', async () => {
  const response = await api.get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const ids = response.body.map(blog => blog.id)
  ids.map(id => expect(id).toBeDefined())
})  

test('valid blog can be created', async () => {
  const newBlog = helper.initialBlogs[0]
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length+1)
})

test('If blog is without likes, 0 is set default', async () => {
  const blogWithoutLikes = {
    author: 'John',
    title: 'without likes',
    url: 'http://test.com'
  }
  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
  
  const addedBlog = await Blog.find({ title: 'without likes' })
  expect(addedBlog)
})

test('created without title or url', async () => {
  const withoutTitle = {
    author: 'without title',
    url: 'without title'
  }
  const withoutUrl = {
    author: 'without url',
    title: 'without url'
  }
  await api
    .post('/api/blogs')
    .send(withoutTitle)
    .expect(400)

})

test('blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
})

afterAll(async () => {
  await mongoose.connection.close()
})