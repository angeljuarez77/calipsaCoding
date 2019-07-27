const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');

const SALT = 12;

const sequelize = new Sequelize({
  database: '20-questions',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});

const User = sequelize.define('user', {
  user_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

// eslint-disable-next-line no-unused-vars
User.beforeCreate((user, options) => {
  const passwordEncrypted = bcrypt.hashSync(user.password, SALT);
  // eslint-disable-next-line no-param-reassign
  user.password = passwordEncrypted;
});

module.exports = {
  sequelize,
  User,
};
