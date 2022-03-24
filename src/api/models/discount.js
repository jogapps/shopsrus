'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    desc: {
      allowNull: false,
      type: DataTypes.TEXT,
      },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    application: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['VALUE', 'PERC'],
      },
    value: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Discount',
    timestamps: true,
    paranoid: true,
    tableName: 'Discounts'
  });
  return Discount;
};