const User = require('./User')
const Chatroom = require('./Chatroom')
const Message = require('./Message')

User.belongsToMany(Chat, {
    through: {
        model: message
    }
    foreignKey: 'user_id',
})



Chatroom.belongsToMany(User, {
    foreignKey: 'user_id',
})

// Message will belong to user foreignkey of userId
// Message belongs to chatroom foreignkey of chatroomId
// Chatroom belongs to many user through message
// User belongs to many chatroom through message

// message holds userid and chatroom id

module.exports = { User, Chatroom };