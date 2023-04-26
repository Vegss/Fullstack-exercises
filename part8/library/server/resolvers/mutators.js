const Book = require('../models/Book')
const Author = require('../models/Author')
const User = require('../models/User')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mutators = {
  createUser: async (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    try {
      return await user.save()
    } catch (error) {
      throw new GraphQLError(error.message)
    }
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })

    if (!user || args.password !== 'secret') {
      throw new GraphQLError('wrong credentials')
    }
    const userForToken = {
      username: user.username,
      id: user._id
    }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
  },

  addBook: async (root, args, context) => {

    if (!context.currentUser) throw new GraphQLError('No permission to add book without login')

    let author = await Author.findOne({ name: args.author })

    if (!author) author = new Author({ name: args.author })

    try {
      await author.save()
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.author,
          error
        }
      })
    }

    const book = new Book({ ...args, author })
    try {
      return book.save()        
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.author,
          error
        }
      })
    }
  },
  editAuthor: async (root, args, context) => {

    if (!context.currentUser) throw new GraphQLError('No permission to edit author without login')

    const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { returnDocument: 'after' }
      )
    if (!author) throw new GraphQLError(`Author ${args.name} not found`)
    try {
      return author.save()
    } catch (error) {
      throw new GraphQLError(error.message)
    }
  }
}

module.exports = mutators