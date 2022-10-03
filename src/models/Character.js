const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character' , {
    picture: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.FLOAT
    },
    history: {
      type: DataTypes.STRING
    }
  })
}
