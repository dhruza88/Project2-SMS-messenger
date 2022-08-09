const sequelize = require('../config/connection');
const { User, Message, Chatroom } = require('../models');

const userData = require('./userData.json');
const messageData = require('./message.json')
const chatroomData = require('./chatroomData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData,{individualHooks:true});
    await Chatroom.bulkCreate(chatroomData,{individualHooks:true});
    await Message.bulkCreate(messageData);
  
    // const users = await User.bulkCreate(userData, {
    //   individualHooks: true,
    //   returning: true,
    // });
  
    // for (const chatroom of chatroomData) {
    //   await Chatroom.create({
    //     ...chatroom,
    //     user_id: users[Math.floor(Math.random() * users.length)].id,
    //   });
    // }
    console.log('seeding complete')
    process.exit(0);
  };
  
  seedDatabase();