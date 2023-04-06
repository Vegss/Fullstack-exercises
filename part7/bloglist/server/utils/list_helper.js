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

const mostLikes =  (blogs) => {
  const blogsByAuthor = lodash.groupBy(blogs, 'author')
  let mostLiked = Object.keys(blogsByAuthor)[0]
  Object.keys(blogsByAuthor).map(author =>{
    if (blogsByAuthor[author].liked > blogsByAuthor[mostLiked].liked) mostLiked = author
  })
  return {
    "author": mostLiked,
    "likes": blogsByAuthor[mostLiked].reduce((total, blog) => total + blog.likes, 0)
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}