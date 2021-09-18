'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ev_charge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ev_charge.init({
    rfId: DataTypes.STRING,
    deviceId: DataTypes.STRING,
    sessionToken: DataTypes.STRING,
    chargeStart: DataTypes.DATE,
    chargeEnd: DataTypes.DATE,
    chargeStatus: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'ev_charge',
  });
  return ev_charge;
};