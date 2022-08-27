const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

mongoose.connect(url)

const numberValidator = [/^\d{2}-\d+|^\d{3}-\d+/, 'Number is formatted wrongly']
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    minlength: 8,
    validate: numberValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)