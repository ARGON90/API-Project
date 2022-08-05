'use strict';

// const { formatNamedParameters } = require('sequelize/types/utils');
// const { Spot } = require('../models')

// const spots = [
// ]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "spot street",
        city: 'spot city',
        state: 'spot state',
        country: 'country',
        lat: 13.1234567,
        lng: -21.1234567,
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
        lat: 33.1234567,
        lng: -44.1234567,
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
