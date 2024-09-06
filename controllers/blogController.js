const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

// Home page route - List all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Single post route
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: User });
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.render('post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
