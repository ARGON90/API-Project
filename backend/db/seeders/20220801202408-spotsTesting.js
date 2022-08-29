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
        name: 'Lakehouse',
        description: 'This is a lakehouse, it has a lakeview and everything',
        price: 699
      },
      {
        ownerId: 1,
        address: "7524 Auden Trail",
        city: 'Sandy Springs',
        state: 'Georgia',
        country: 'United States',
        lat: 13.1234567,
        lng: -21.1234567,
        name: 'Mountain House',
        description: 'This is a mountain house with great views',
        price: 50
      },
      {
        ownerId: 1,
        address: "310 Mustang Court",
        city: 'Milton',
        state: 'Georgia',
        country: 'United States',
        lat: 13.1234567,
        lng: -21.1234567,
        name: 'Beach House',
        description: 'This is an island spot for island people',
        price: 320
      },
      {
        ownerId: 2,
        address: "555 address",
        city: 'Philadelphia',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'City House',
        description: 'This is a modern house located in the city',
        price: 199
      },
      {
        ownerId: 2,
        address: "888 Houze way",
        city: 'Alpharetta',
        state: 'Georgia',
        country: 'United States',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Normal Place',
        description: 'Fancy place with nice things',
        price: 459
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
