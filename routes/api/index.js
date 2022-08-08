const router = require('express').Router();
const chatroomRoutes = require('./Chat-routes');
const messageRoutes = require('./message-routes');
const userRoutes = require('./user-routes');


router.use('/chatrooms', chatroomRoutes);
router.use('/messages', messageRoutes);
router.use('/user', userRoutes);


module.exports = router;
