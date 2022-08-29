const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  return (blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0)
  )
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  blogs.forEach( blog => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
    }
  })
  const favoriteBlog = blogs.find( blog => blog.likes === mostLikes)
  return (
    {
      author: favoriteBlog.author,
      likes: favoriteBlog.likes,
      title: favoriteBlog.title
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

