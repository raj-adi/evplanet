'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ev_charges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rfId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sessionToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chargeStart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      chargeEnd: {
        type: Sequelize.DATE
      },
      chargeStatus: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('ev_charges');
  }
};