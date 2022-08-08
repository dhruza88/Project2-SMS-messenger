const router = require('express').Router();
const chatroomRoutes = require('./Chat-routes');
const userRoutes = require('./user-routes');


router.use('/chatrooms', chatroomRoutes);
router.use('/user', userRoutes);


module.exports = router;
