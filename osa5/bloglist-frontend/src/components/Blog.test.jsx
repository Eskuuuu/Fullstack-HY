import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content correctly', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "Eino Leino",
    likes: 0,
    url: "EinoLeino.fi"
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  const element2 = screen.queryByText('Eino Leino')


  screen.debug(element)

  expect(element).toBeDefined()
  expect(element2).toBeNull
})

test('renders content correctly when show is pressed.', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: "Eino Leino",
      likes: 0,
      url: "EinoLeino.fi"
    }

  
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)
  
    const element = screen.getByText('Component testing is done with react-testing-library')
    const element2 = screen.queryByText('Eino Leino')
  
  
    screen.debug(element)
  
    expect(element).toBeDefined()
    expect(element2).toBeDefined()
  })


  test('like button works', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: "Eino Leino",
      likes: 0,
      url: "EinoLeino.fi"
    }

    const mockHandler = vi.fn()
  
    render(<Blog blog={blog} updateBlog={mockHandler} user={null} deleteBlog={null} />)
  
    const user = userEvent.setup()

    const button1 = screen.getByText('Show')
    await user.click(button1)

    const button2 = screen.getByText('Like')
    await user.click(button2)
    await user.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })