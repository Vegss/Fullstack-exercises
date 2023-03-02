const listHelper = require('../utils/list_helper')

const oneBlog = [
  {
    title: 'Test',
    author: 'John',
    url: 'http://test.com',
    likes: 1
  }
]
const multipleBlogs = [
  {
    title: 'Test1',
    author: 'John',
    url: 'http://test1.com',
    likes: 1
  },
  {
    title: 'Test2',
    author: 'Tommy',
    url: 'http://test2.com',
    likes: 4
  },
  {
    title: 'Test3',
    author: 'Tim',
    url: 'http://test3.com',
    likes: 5
  },
  {
    title: 'Test4',
    author: 'John',
    url: 'http://test4.com',
    likes: 3
  },
]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(1)
  })
  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(13)
  })
})

describe('favorite blog', () => {
  test('favorite blog of multiple blogs', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(multipleBlogs[2])
  })
})

describe('Most blogs', () => {
  test('By author', () => {
    const result = listHelper.mostBlogs(multipleBlogs)
    expect(result).toEqual(
      {
        "author": "John",
        "blogs": 2
      }
    )
  })
})