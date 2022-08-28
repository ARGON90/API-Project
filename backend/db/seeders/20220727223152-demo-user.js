'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Jimmy',
        lastName: 'Jimmerson',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'Fred',
        lastName: 'Fredderson',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: 'George',
        lastName: 'Georgie',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        firstName: 'Sallie',
        lastName: 'Sallerson',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user5@user.io',
        firstName: 'Mary',
        lastName: 'Marison',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
