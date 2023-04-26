const Book = require('../models/Book')
const Author = require('../models/Author')

const mutators = {
  addBook: async (root, args) => {
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
  editAuthor: async (root, args) => {
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