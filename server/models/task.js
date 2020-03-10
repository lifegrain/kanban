'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Task extends Model { }

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `title can't be empty`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `category can't be empty`
        }
      }
    }
  }, { sequelize });
  Task.associate = function (models) {
    Task.belongsTo(models.User)
  };
  return Task;
};