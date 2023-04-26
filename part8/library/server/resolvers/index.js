const Book = require('../models/Book')
const { GraphQLError } = require('graphql')

const mutators = require('./mutators')
const queries = require('./queries')

const resolvers = {
  Query: queries,
  Mutation: mutators,
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root.id })
      return booksByAuthor.length
    }
  }
}

module.exports = resolvers