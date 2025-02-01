import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import ErrorNotification from './components/errorNotification.jsx'
import ToggleAdd from './components/toggleadd.jsx'
import BlogForm  from './components/BlogForm.jsx'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        setBlogs( blogs )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handlelogout = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setErrorMessage('Succesfully logged out!')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage('Blog added successfully')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlog = (id, updatedBlog) => {
    blogService.update(id, updatedBlog).then(returnedBlog => {
      setBlogs(blogs.map(blog => (blog.id === id ? returnedBlog : blog)))
    })
  }

  const deleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .del(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage('Blog deleted successfully')
          setTimeout(() => setMessage(''), 5000)
        })
    }
  }





  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={message} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handlelogout}>logout</button>
        <ToggleAdd buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </ToggleAdd>

        {blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
          )}




      </div>
      }
    </div>
  )
}

export default App