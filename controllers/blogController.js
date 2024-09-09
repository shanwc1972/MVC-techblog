const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
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

// Get a single post route
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
         include: [
            {
              model: User,
              attributes: ['username'],
            },
            {
              model: Comment,
              include: [{
                model: User,
                attributes: ['username']
              }],
              attributes: ['content', 'createdAt']
            },
        ],
    });

    const post = postData.get({ plain: true});
    console.log(post);

    res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
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

router.get('/dashboard', withAuth, async (req, res) => {
    //Render the dashboard when the user logs on
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      console.log(user);
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/postedit/:id', withAuth, async (req, res) => {
    // render a post edit form when the post is clicked within the dashboard
    try {
        const postData = await Post.findByPk(req.params.id, {
             include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
    
        const post = postData.get({ plain: true});
    
        res.render('postedit', {
            ...post,
            logged_in: req.session.logged_in
          });
        } catch (err) {
          res.status(500).json(err);
        }
});

router.post('/comments', withAuth, async (req, res) => {
  //Add a comment for a post
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.session.user_id,
    });

    res.status(200).json(newComment);

  } catch (err) {
    console.error('Error creating comment:', err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
