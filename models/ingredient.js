'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingredient = sequelize.define('ingredient', {
    name: DataTypes.STRING,
    pantryId: DataTypes.INTEGER
  }, {});
  ingredient.associate = function(models) {
    // associations can be defined here
    models.ingredient.belongsToMany(models.pantry, {through: 'pantriesIngredients'})

  };
  return ingredient;
};