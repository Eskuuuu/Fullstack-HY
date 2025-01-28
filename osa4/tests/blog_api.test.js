const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')



const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogSchema = new Blog(initialBlogs[0])
    await blogSchema.save()
    blogSchema = new Blog(initialBlogs[1])
    await blogSchema.save()
    blogSchema = new Blog(initialBlogs[2])
    await blogSchema.save()
    blogSchema = new Blog(initialBlogs[3])
    await blogSchema.save()
    blogSchema = new Blog(initialBlogs[4])
    await blogSchema.save()
    blogSchema = new Blog(initialBlogs[5])
    await blogSchema.save()
  })
describe('Testing adding and correctness', async () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })



  test('there are six blogs', async () => {
      const response = await api.get('/api/blogs')
    
      assert.strictEqual(response.body.length, initialBlogs.length)
    })

  test('Blogs have id field as identifier', async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach(blog => {
          assert(blog.id !== undefined, 'Blog should have an id field');
          assert.strictEqual(blog._id, undefined, 'Blog should not have an _id field');
        });
  })

  test('a blog can be added ', async () => {
      const newBlog = {
          title: "StringTest",
          author: "String",
          url: "String",
          likes: 75
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
    
      const contents = response.body.map(r => r.title)
    
    
      assert.strictEqual(response.body.length, initialBlogs.length + 1)
    
      assert(contents.includes('StringTest'))
  })
})

describe('Deleting blog', () => {
  test('Deleting a blog', async () => {
    const blogsAtBeginning = await api.get('/api/blogs')
    const blogToDelete = blogsAtBeginning.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);
    const blogsatEnd = await api.get('/api/blogs')

    assert.strictEqual(blogsatEnd.body.length, blogsAtBeginning.body.length - 1)
  })
})

after(async () => {
    await mongoose.connection.close()
})