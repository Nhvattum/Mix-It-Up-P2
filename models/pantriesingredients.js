'use strict';
module.exports = (sequelize, DataTypes) => {
  const pantriesIngredients = sequelize.define('pantriesIngredients', {
    pantryId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {});
  pantriesIngredients.associate = function(models) {
    // associations can be defined here
  };
  return pantriesIngredients;
};