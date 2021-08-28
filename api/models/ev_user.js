'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ev_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ev_user.init({
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    isAdmin: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'ev_user',
  });
  return ev_user;
};