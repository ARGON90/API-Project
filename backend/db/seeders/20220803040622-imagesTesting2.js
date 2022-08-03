'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'url-1.com',
        previewImage: true,
        spotId: 1,
        reviewId: 1,
        userId: 1,
      },



    ])
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('People');

  }
};
