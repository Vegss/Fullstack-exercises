const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('cannot create invalid user', () => {
  test('username too short', async () => {
    const tooShortUser = {
      username: 'a',
      password: 'password',
      name: 'test'
    }
    await api
      .post('/api/users')
      .send(tooShortUser)
      .expect(400)
  })
  test('password too short', async () => {
    const tooShortPass = {
      username: 'testtest',
      password: 'p',
      name: 'test'
    }
    await api
      .post('/api/users')
      .send(tooShortPass)
      .expect(400)
  })
  test('not unique', async () => {
    const notUnique = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(notUnique)
      .expect(400)
  })
})