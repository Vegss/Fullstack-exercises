const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { usersAtStart } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(usersAtStart[0])
  await userObject.save()
  userObject = new User(usersAtStart[1])
  await userObject.save()
  userObject = new User(usersAtStart[2])
  await userObject.save()
})

describe('Posting a new user', () => {
  test('Posting with too short username', async () => {
    const newUser = {
      username: 'ad',
      name: 'John',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'Username is too short' })
  })
  test('Posting with not unique username', async () => {
    const newUser = {
      username: 'User1',
      name: 'John',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ error: 'Username is not unique' })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

