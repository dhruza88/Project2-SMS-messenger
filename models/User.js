const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
    {


        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        password: {
            type:DataTypes.STRING,
            validate:{
                len: [8],
            },
        },
        username: {
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        chatroom: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        bioId: {
            type:DataTypes.TEXT,
            
        }
    },
    {
        sequelize,
        hooks:{
            beforeCreate: userObj=>{
                userObj.password = bcrypt.hashSync(userObj,password,5);
                return userObj
            }
        }
    }
);

module.exports = User;