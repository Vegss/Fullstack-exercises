const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { mongoose } = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const { GraphQLError } = require('graphql')

require('dotenv').config()

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log('error connecting to mongodb:', error.message))


const typeDefs = `
  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
    }
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!
  }
  type Author {
    name: String!,
    id: String!,
    born: Int,
    bookCount: Int!
  }
  
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ 
          $and: [
            { author: author.id },
            { genres: { $in: args.genre } }
          ]
        }).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author.id }).populate('author')
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }

      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root.id })
      return booksByAuthor.length
    }
  },

  Mutation: {
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
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})