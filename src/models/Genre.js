const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture:{
      type: DataTypes.STRING
    }
  })
}