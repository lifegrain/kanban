'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const bcrypt = require(`../helpers/bcrypt`)

  class User extends Model { }

  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Email can't be empty`
        },
        isEmail: {
          msg: `Invalid email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password can't be empty!`
        }
      }
    }
  }, { sequelize, hooks: {
    beforeCreate: (instance, options) => {
      instance.password = bcrypt.hashing(instance.password)
    }
  }});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};