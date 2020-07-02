'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING,
    pantryId: DataTypes.INTEGER
  }, {});
  ingredient.associate = function(models) {
    // associations can be defined here
  };
  return ingredient;
};