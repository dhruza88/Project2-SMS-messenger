const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
 }


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {
                isEmail: true,
            },
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
        // picture: {
        //     type: DataTypes.STRING,
        //     allowNull:false,
        // },
        bio: {
            type:DataTypes.TEXT,
            
        }
    },
    {
        sequelize,
        hooks:{
            beforeCreate: async (userObj)=>{
                 userObj.password = await bcrypt.hashSync(userObj.password,5);
                return userObj;
            },
        },
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;

// rerun schema
// fix seeds