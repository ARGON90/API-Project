'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      // SPOT 1
      {
        spotId: 1,
        userId: 3,
        startDate: new Date ("2022-11-11"),
        endDate: new Date ("2022-11-15"),
      },
      {
        spotId: 1,
        userId: 4,
        startDate: new Date ("2022-11-19"),
        endDate: new Date ("2022-11-22"),
      },
      {
        spotId: 1,
        userId: 5,
        startDate: new Date ("2022-11-23"),
        endDate: new Date ("2022-11-28"),
      },

      // SPOT 2
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2022-10-26"),
        endDate: new Date("2022-10-27"),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2022-10-29"),
        endDate: new Date("2022-10-31"),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2022-11-01"),
        endDate: new Date("2022-11-03"),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date ("2023-11-15"),
        endDate: new Date("2023-11-16"),
      },
      {
        spotId: 2,
        userId: 4,
        startDate: new Date ("2023-11-17"),
        endDate: new Date("2023-11-19"),
      },
      {
        spotId: 2,
        userId: 5,
        startDate: new Date ("2023-11-21"),
        endDate: new Date("2023-11-25"),
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings')
  }
};
