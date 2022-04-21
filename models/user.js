'use strict';
const {
  Model
} = require('sequelize');

// import bcrypt
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    // method untuk melakukan enskripsi
    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    // lalu, buat method register
    static register = ({ username, email, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword, email })
    }

    checkPassword = password => bcrypt.compareSync(password, this.password)
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } })
        if (!user) return Promise.reject("User not found!")
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("Wrong password!")
        return Promise.resolve(user)
      }
      catch (err) {
        return Promise.reject(err)
      }
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};