'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'url-1.com',
        previewImage: true,
        reviewId: 1,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'url-2.com',
        previewImage: true,
        reviewId: 2,
        userId: 2,
        spotId: 1,
      },
      {
        url: 'url-3.com',
        previewImage: true,
        reviewId: 3,
        userId: 1,
        spotId: 2,
      },
      {
        url: 'url-4.com',
        previewImage: true,
        reviewId: 4,
        userId: 2,
        spotId: 2,
      },



    ])
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images');

  }
};
