'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      paymentId: {
        type: DataTypes.INTEGER,
        references: { model: "Payments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: true
      },
      cartId: {
        type: DataTypes.INTEGER,
        references: { model: "Carts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isPayed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('Orders')
  }
};
