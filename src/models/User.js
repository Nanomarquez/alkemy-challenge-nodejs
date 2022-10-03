const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
  sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "The username must be a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    hooks: {
      beforeCreate: async function( user ){
        user.password = await bcrypt.hash(user.password, 10)
      }
    }
  });
};

