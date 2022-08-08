const router = require('express').Router();
const chatroomRoutes = require('./chatroom-routes');
const messageRoutes = require('./message-routes');
const userRoutes = require('./user-routes');
const directMsgRoutes = require('./directMsg-routes')

router.use('/chatrooms', chatroomRoutes);
router.use('/messages', messageRoutes);
router.use('/user', userRoutes);
router.use('/directMsg', directMsgRoutes);

module.exports = router;
