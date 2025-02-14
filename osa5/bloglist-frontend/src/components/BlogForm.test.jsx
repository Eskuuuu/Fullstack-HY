import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('calls createBlog with the right details when a new blog is created', async () => {
  const createBlog = vi.fn() // Mock function to simulate the callback
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // Fill in the form fields
  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('URL:')

  await user.type(titleInput, 'Tuntematon Sotilas')
  await user.type(authorInput, 'Eino Leino')
  await user.type(urlInput, 'EinoLeino.fi')

  // Submit the form
  const saveButton = screen.getByText('Add')
  await user.click(saveButton)

  // Assert that the createBlog function was called with the correct data
  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Tuntematon Sotilas',
    author: 'Eino Leino',
    url: 'EinoLeino.fi',
  })
})