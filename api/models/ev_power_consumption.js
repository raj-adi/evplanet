'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ev_power_consumption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ev_power_consumption.init({
    sessionToken: DataTypes.STRING,
    powerConsumed: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ev_power_consumption',
  });
  return ev_power_consumption;
};