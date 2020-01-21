'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trxId: {
        type: Sequelize.STRING
      },
      accountNo: {
        type: Sequelize.INTEGER
      },
      accountName: {
        type: Sequelize.STRING
      },
      installmentNo: {
        type: Sequelize.INTEGER
      },
      plafon: {
        type: Sequelize.DOUBLE
      },
      postedAmount: {
        type: Sequelize.DOUBLE
      },
      postedDate: {
        type: Sequelize.DATE
      },
      postedBy: {
        type: Sequelize.STRING
      },
      ket: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reports');
  }
};