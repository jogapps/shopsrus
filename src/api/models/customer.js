'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    discount_id: {
      type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
      unique: true
    },
    account_type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['REGULAR', 'AFFILIATE', 'EMPLOYEE']
    }
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
    paranoid: true,
    tableName: 'Customers'
  });
  return Customer;
};