'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      discount_id: {
        type: Sequelize.UUID,
      },
      product_name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      is_groceries: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(65, 0)
      },
      payable_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(65, 0)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};