'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    idDrink: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    models.favorite.belongsToMany(models.user, {through: 'usersFavorites'})
  };
  return favorite;
};