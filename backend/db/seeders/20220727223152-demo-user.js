'use strict';
// npx dotenv sequelize db:migrate
// npx dotenv sequelize db:seed:all

const bcrypt = require("bcryptjs");

let firstNames = ['Alex', 'Daniel', 'Ray', 'David', 'Bill', 'Anthony', 'Giordan', 'Tyler', 'Cecilia', 'Edward',
    'Rudy', 'Jason', 'Randy', 'Ben', 'Justine', 'Julie', 'Alec', 'Connor',
    'Tiffany']

let lastNames = ['Yang', 'Henry', 'Hoffman', 'Venida', 'Lam', 'Adams', 'Pizarro', 'Felipe', 'Jung', 'Jang', 'Jean',
    'Waldee', 'Chang', 'Nguyen', 'Ou', 'Maniti', 'Gonglach', 'Chen']

function randomNum() {
  return Math.floor(Math.random() * lastNames.length)
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user5@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user6@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user7@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user8@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user9@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user10@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user11@user.io',
        firstName: `${firstNames[randomNum()]}`,
        lastName: `${lastNames[randomNum()]}`,
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password3')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
