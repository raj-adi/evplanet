'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ev_rfids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rfId: {
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
    await queryInterface.dropTable('ev_rfids');
  }
};