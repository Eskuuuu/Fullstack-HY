const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
  
    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'Title and URL are required' });
    }
  
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
    });
  
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  
    response.status(201).json(savedBlog);
  });

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;

    if (body.likes === undefined) {
        return response.status(400).json({ error: 'Likes value is required' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes: body.likes }, // Explicitly update the likes field
        { new: true }          // Return the updated document
    );

    if (!updatedBlog) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    response.json(updatedBlog);
});


module.exports = blogsRouter