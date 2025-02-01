import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setUrl('')
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            data-testid="Title"
            placeholder='title'
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            data-testid="Author"
            placeholder='author'
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            placeholder='url'
            data-testid="URL"
            type="text"
            id="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogForm