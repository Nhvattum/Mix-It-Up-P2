'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersFavorites = sequelize.define('usersFavorites', {
    userId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {});
  usersFavorites.associate = function(models) {
    // associations can be defined here
  };
  return usersFavorites;
};