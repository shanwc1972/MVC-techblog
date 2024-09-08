const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Post',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Comment',
  freezeTableName: true
});

module.exports = Comment;