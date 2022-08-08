const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
    {
        // id:
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // chatroom_id: fk
        chatroom_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'chatroom',
                key: 'id',
              },
        },
        // user_id: fk
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
              },
        },
        // text: string
        text: {
            type: DataTypes.TEXT,
        }
    },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'message',
  }
);

module.exports = Message;
