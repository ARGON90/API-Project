'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Reviews', [

    // REVIEWS FOR SPOT 1
     {
       review: 'User 2 review for spot 1',
       stars: 2,
       userId: 2,
       spotId: 1,
     },
     {
       review: 'User 3 review for spot 1',
       stars: 3,
       userId: 3,
       spotId: 1,
     },
     {
       review: 'User 4 review for spot 1',
       stars: 4,
       userId: 4,
       spotId: 1,
     },
     {
       review: 'User 5 review for spot 1',
       stars: 5,
       userId: 5,
       spotId: 1,
     },

     // REVIEWS FOR SPOT 2
    {
      review: 'User1 review for spot 2',
      stars: 4,
      userId: 1,
      spotId: 2,
    },

    // REVIEWS FOR SPOT 3
    {
      review: 'User 1 review for spot 3',
      stars: 4,
      userId: 1,
      spotId: 3,
    },
    {
      review: 'User 2 review for spot 3',
      stars: 5,
      userId: 2,
      spotId: 3,
    },



   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews')
  }
};
