'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ev_user_rfid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ev_user_rfid.init({
    userId: DataTypes.INTEGER,
    rfId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ev_user_rfid',
  });
  return ev_user_rfid;
};