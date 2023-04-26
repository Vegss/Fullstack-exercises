const Book = require('../models/Book')
const Author = require('../models/Author')

const queries = {
  bookCount: async () => Book.collection.countDocuments(),
  authorCount: async () => Author.collection.countDocuments(),
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
}

module.exports = queries