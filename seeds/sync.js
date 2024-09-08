const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Sync all models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});