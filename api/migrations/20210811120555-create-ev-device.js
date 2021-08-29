'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ev_devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deviceCategory: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deviceAddress1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deviceAddress2: {
        type: Sequelize.STRING
      },
      deviceAddressLandmark: {
        type: Sequelize.STRING
      },
      deviceCity:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      deviceState:  {
        allowNull: false,
        type: Sequelize.STRING
      },
      deviceCountry: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        allowNull: false,
      },
      inUse: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ev_devices');
  }
};
