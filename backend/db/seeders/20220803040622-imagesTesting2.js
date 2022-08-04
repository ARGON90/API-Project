'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'url-Spot1.com',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'url-Spot2.com',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'url-review1-Spot1.com',
        previewImage: true,
        reviewId: 1,
        userId: 1,
        spotId: null,
      },
      {
        url: 'url-review2-Spot1.com',
        previewImage: true,
        reviewId: 2,
        userId: 2,
        spotId: null,
      },
      {
        url: 'url-review1-Spot2.com',
        previewImage: true,
        reviewId: 3,
        userId: 1,
        spotId: null,
      },
      {
        url: 'url-review2-Spot2.com',
        previewImage: true,
        reviewId: 4,
        userId: 2,
        spotId: null,
      },
    ])
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images');

  }
};
