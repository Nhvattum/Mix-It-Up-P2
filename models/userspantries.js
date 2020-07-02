'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersPantries = sequelize.define('usersPantries', {
    userId: DataTypes.INTEGER,
    pantryId: DataTypes.INTEGER
  }, {});
  usersPantries.associate = function(models) {
    // associations can be defined here
  };
  return usersPantries;
};