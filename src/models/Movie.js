const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Movie',{
    picture: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calification: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  })
}