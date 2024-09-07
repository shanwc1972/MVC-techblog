const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Home page route - List all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
         include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

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

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

router.get('/signup', (req, res) => {
    // Redirect to signup if  the user chooses to do so
  
    res.render('signup');
});

router.get('/logout', (req, res) => {
    //Redirect to homepage if this route is visited

    res.render('home');
})

  // Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
