import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'This blog is for testing',
  author: 'Tester Test',
  url: 'www.test.com',
  likes: 0,
  id: 'blogId123',
  user: {
    name: 'TestName',
    id: 'userId123'
  }
}

describe('<Blog />', () => {
  const likeMockHandler = jest.fn()
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLikes={likeMockHandler} />,
    ).container
  })

  test('Renders only title and author by default', () => {

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(title).toHaveTextContent(blog.title)
    expect(author).toHaveTextContent(blog.author)
    expect(url).not.toBeInTheDocument(blog.url)
    expect(likes).not.toBeInTheDocument(blog.likes)
  })

  test('Renders details when view button is clicked', async () => {

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByTestId('blog-details'))
  })

  test('Liking twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})