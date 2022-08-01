'use strict';

// const { formatNamedParameters } = require('sequelize/types/utils');
// const { Spot } = require('../models')

// const spots = [
// ]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "spot street",
        city: 'spot city',
        state: 'spot state',
        country: 'country',
        lat: 1.1,
        lng: 2.2,
        name: 'name',
        description: 'description',
        price: 500
      },
      {
        ownerId: 2,
        address: "spot street2",
        city: 'spot city2',
        state: 'spot state2',
        country: 'country2',
        lat: 1.2,
        lng: 2.3,
        name: 'name2',
        description: 'description2',
        price: 502
      },
    ],
      {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots')
  }
};
