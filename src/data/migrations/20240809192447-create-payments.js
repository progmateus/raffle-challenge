'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Payments', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recurrence: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      installments: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      statementDescriptor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cardFinalNumbers: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cardHolderName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      line1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Payments')
  }
};
