const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { blogsAtStart, blogsInDatabase } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogsAtStart[0])
  await blogObject.save()
  blogObject = new Blog(blogsAtStart[1])
  await blogObject.save()
  blogObject = new Blog(blogsAtStart[2])
  await blogObject.save()
})

describe('Blogs on right format', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await blogsInDatabase()
    expect(blogs[0].id).toBeDefined()
  })
})

describe('Adding a blog post', () => {

  test('Posting a blog', async () => {
    const newBlog =   {
      title: 'People',
      author: 'Jane',
      url: 'www.people.com',
      likes: 80
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDatabase()
    const titles = blogsAfter.map(blog => blog.title)

    expect(blogsAfter.length).toBe(blogsAtStart.length + 1)
    expect(titles).toContain('People')
  })

  test('Posting a blog without likes', async () => {
    const newBlog =   {
      title: 'without likes',
      author: 'Joe',
      url: 'www.withoutlikes.com',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await blogsInDatabase()
    const testBlog = await blogs.find(blog => blog.title === 'without likes')
    expect(testBlog.likes).toBe(0)
  })

  test('Posting a blog without url and title', async () => {
    const newBlog =   {
      author: 'Jane',
      likes: 80
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('Deleting or updating blogs', () => {
  test('Delete a blog', async () => {
    const newBlog =   {
      title: 'People',
      author: 'Jane',
      url: 'www.people.com',
      likes: 80
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDatabase()
    const blog = blogs.find(blog => blog.title === 'People')
    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(204)
  })

  test('Updating a blog', async () => {
    const newBlog =   {
      title: 'new',
      author: 'new',
      url: 'www.new.com',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogs = await blogsInDatabase()
    const blog = blogs.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      title: 'updated',
      author: 'updated',
      url: 'www.updated.com',
      likes: 400
    }

    await api
      .put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})