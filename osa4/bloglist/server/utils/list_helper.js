const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  blogs.map(blog => blog.likes > favorite.likes ? favorite = blog : null)
  return favorite
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = lodash.countBy(blogs, 'author')
  const mostWrittenAuthor = Object.keys(blogsByAuthor).reduce((max, current) => {
    return blogsByAuthor[current] > blogsByAuthor[max] 
    ? current
    : max
  })
  return { 
    "author": mostWrittenAuthor,
    "blogs": blogsByAuthor[mostWrittenAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}