'use strict';
module.exports = (sequelize, DataTypes) => {
  const pantry = sequelize.define('pantry', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  pantry.associate = function(models) {
    // associations can be defined here
  };
  return pantry;
};