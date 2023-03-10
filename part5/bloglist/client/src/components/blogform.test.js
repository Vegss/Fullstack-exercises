import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('Form calls callback functions with right values', async () => {
    const addBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm addBlog={ addBlog } />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'testtitle')
    await user.type(authorInput, 'testauthor')
    await user.type(urlInput, 'testurl')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testtitle')
    expect(addBlog.mock.calls[0][0].author).toBe('testauthor')
    expect(addBlog.mock.calls[0][0].url).toBe('testurl')
  })
})