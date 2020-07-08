'use strict';
module.exports = (sequelize, DataTypes) => {
  const pantry = sequelize.define('pantry', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  pantry.associate = function(models) {
    // associations can be defined here
    models.pantry.belongsTo(models.user)
    models.pantry.belongsToMany(models.ingredient, {through: 'pantriesIngredients'})
  };
  return pantry;
};