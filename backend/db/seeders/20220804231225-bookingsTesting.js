'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      // SPOT 1
      {
        spotId: 1,
        userId: 3,
        startDate: new Date ("2023-11-11"),
        endDate: new Date ("2023-11-15"),
      },
      {
        spotId: 1,
        userId: 4,
        startDate: new Date ("2023-11-19"),
        endDate: new Date ("2023-11-22"),
      },
      {
        spotId: 1,
        userId: 5,
        startDate: new Date ("2023-11-23"),
        endDate: new Date ("2023-11-28"),
      },

      // SPOT 2
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2023-10-10"),
        endDate: new Date("2023-10-12"),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2023-10-13"),
        endDate: new Date("2023-10-14"),
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date ("2023-10-15"),
        endDate: new Date("2023-10-16"),
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings')
  }
};
