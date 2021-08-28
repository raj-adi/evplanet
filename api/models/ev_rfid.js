'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ev_rfid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ev_rfid.init({
    rfId: DataTypes.STRING,
    isActive: DataTypes.TINYINT,
    inUse: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'ev_rfid',
  });
  return ev_rfid;
};