const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Service; 