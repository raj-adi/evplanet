'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ev_device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ev_device.init({
    deviceId: DataTypes.STRING,
    deviceCategory: DataTypes.STRING,
    deviceAddress1: DataTypes.STRING,
    deviceAddress2: DataTypes.STRING,
    deviceAddressLandmark: DataTypes.STRING,
    deviceCity: DataTypes.STRING,
    deviceState: DataTypes.STRING,
    deviceCountry: DataTypes.STRING,
    isActive: DataTypes.TINYINT,
    inUse: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'ev_device',
  });
  return ev_device;
};