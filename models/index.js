const User = require('./User')
const Chat = require('./Chat')

User.hasMany(Chat, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Chat.hasMany(User, {
    foreignKey: 'chat_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Chat };