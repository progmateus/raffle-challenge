'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Payments', "orderId", {
      type: DataTypes.INTEGER,
      references: {
        model: "Orders",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: true
    }
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Payments", "orderId");
  }
};
