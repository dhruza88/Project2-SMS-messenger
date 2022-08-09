const User = require('./User')
const Chatroom = require('./Chatroom')
const Message = require('./Message')

Message.belongsTo(User, {
    foreignKey: 'user_id'
})

Message.belongsTo(Chatroom, {
    foreignKey: 'chatroom_id'
})

User.belongsToMany(Chatroom, {
    through: {
        model: 'message'
    },
    as: 'joined_users'
});

Chatroom.belongsToMany(User, {
    through: {
        model: 'message'
    },
    as: 'added_chatrooms'
});

// Message will belong to user foreignkey of userId
// Message belongs to chatroom foreignkey of chatroomId
// Chatroom belongs to many user through message
// User belongs to many chatroom through message

// message holds userid and chatroom id

module.exports = { User, Message, Chatroom };