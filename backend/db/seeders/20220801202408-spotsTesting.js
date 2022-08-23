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
        address: "1776 Freedom Parkway",
        city: 'Henry',
        state: 'Virginia',
        country: 'United States',
        lat: 13.1234567,
        lng: -21.1234567,
        name: 'Cozy Cabin',
        description: 'This cabin in the woods probably is not haunted',
        price: 275
      },
      {
        ownerId: 2,
        address: "191 Lake Drive",
        city: 'Barnwell',
        state: 'Tennessee',
        country: 'United States',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Lustrous Lakehouse',
        description: 'This grand estate boasts an unbeatable lake view and various amenities for the whole family',
        price: 699
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
