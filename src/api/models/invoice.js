'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    discount_id: {
      type: DataTypes.UUID,
    },
    product_name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    is_groceries: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(65, 0)
    },
    payable_amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(65, 0)
    }
  }, {
    sequelize,
    modelName: 'Invoice',
    timestamps: true,
    paranoid: true,
    tableName: 'Invoices'
  });
  return Invoice;
};