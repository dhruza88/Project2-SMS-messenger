const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chatroom extends Model {}
// id, name, topic
Chatroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    topic: {
      type: DataTypes.STRING,
    },
    text: {
      type:DataTypes.TEXT, 
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chatroom',
  }
);

module.exports = Chatroom;
