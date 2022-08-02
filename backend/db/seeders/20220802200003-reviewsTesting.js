'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Reviews', [
    {
      review: 'this is a review for spot 1',
      stars: 4,
      userId: 1,
      spotid: 1,
    },
    {
      review: 'this is another review for spot 1',
      stars: 2,
      userId: 2,
      spotid: 1,
    },
    {
      review: 'this is another review for spot 2',
      stars: 4,
      userId: 1,
      spotid: 2,
    },
    {
      review: 'this is another review for spot 2',
      stars: 5,
      userId: 2,
      spotid: 2,
    },



   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews')
  }
};
