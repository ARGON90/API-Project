'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2023-10-10"),
        endDate: new Date("2023-10-11"),
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date ("2023-11-11"),
        endDate: new Date ("2023-11-12"),
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings')
  }
};
