const sequelize = require('../config/connection');
const { User, Chat } = require('../models');

const userData = require('./userData.json');
const chatData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const chat of chatData) {
      await Chat.create({
        ...chat,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();