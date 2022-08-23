'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://a0.muscache.com/im/pictures/963301f9-b42d-426d-bc03-550ddddae1b3.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/34b94d56-6d67-4bf8-81b5-18cc082d7759.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/f301d055-d272-4871-8754-9e90a27845bc.jpg?im_w=1440',
        previewImage: true,
        reviewId: 1,
        userId: 1,
        spotId: null,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/364ec95d-44aa-46fc-a123-7f0239c5522f.jpg?im_w=1440',
        previewImage: true,
        reviewId: 2,
        userId: 2,
        spotId: null,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/4958e09f-c84b-4edc-b7c9-3be7506a47f5.jpg?im_w=1200',
        previewImage: true,
        reviewId: 3,
        userId: 1,
        spotId: null,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/58ca000b-3787-4765-8f53-d824bab76cc2.jpg?im_w=720',
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
