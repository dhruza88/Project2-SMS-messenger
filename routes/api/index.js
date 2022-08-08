const router = require('express').Router();
const chatroomRoutes = require('./Chat-routes');
const userRoutes = require('./User-routes');
const messageRoutes = require('./Message-routes')


router.use('/chatroom', chatroomRoutes);
router.use('/user', userRoutes);
router.use('/message', messageRoutes);


module.exports = router;
