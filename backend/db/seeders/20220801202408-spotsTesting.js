'use strict';

// const { formatNamedParameters } = require('sequelize/types/utils');
// const { Spot } = require('../models')

// const spots = [
// ]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 10,
        address: "1776 Freedom Parkway",
        city: 'Henry',
        state: 'Virginia',
        country: 'United States',
        lat: 13.1234567,
        lng: -21.1234567,
        name: 'Rustic Cottage',
        description: 'Beautiful farmhouse cottage in the countryside',
        price: 275
      },
      {
        ownerId: 1,
        address: "191 Lake Drive",
        city: 'Barnwell',
        state: 'Tennessee',
        country: 'United States',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Peaceful Lakefront',
        description: 'Quiet lakehouse with easy access to the waterfront',
        price: 499
      },
      {
        ownerId: 3,
        address: "7524 Oak Trail",
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        lat: 13.1234567,
        lng: -21.1234567,
        name: 'Tiny House',
        description: 'Cute tiny house with a great location',
        price: 199
      },
      {
        ownerId: 4,
        address: "999 Palms Way",
        city: 'Miramar',
        state: 'Florida',
        country: 'United States',
        lat: 13.1234567,
        lng: -21.1234567,
        name: 'Lavish Mansion',
        description: 'Luxurious property with pool and privacy',
        price: 999
      },
      {
        ownerId: 5,
        address: "555 Liberty Way",
        city: 'Towson',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Small Country House',
        description: 'Rural property in a pastoral setting',
        price: 125
      },
      {
        ownerId: 6,
        address: "888 Houze Place",
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Treehouse',
        description: 'Unique treehouse with exquisite views',
        price: 459
      },
      {
        ownerId: 1,
        address: "492 Jungle Path",
        city: 'Kampot',
        state: 'Cambodia',
        country: 'Cambodia',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Jungle Villa',
        description: 'Lush jungle house with great scenery',
        price: 179
      },
      {
        ownerId: 8,
        address: "567 Mountain Pass",
        city: 'Amatlan',
        state: 'Mexico',
        country: 'Mexico',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Cozy Clay House',
        description: 'Secluded home surrounded by nature',
        price: 299
      },
      {
        ownerId: 1,
        address: "78 Terrace Trail",
        city: 'Capri',
        state: 'Italy',
        country: 'Italy',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Italian Villa',
        description: 'Spectactular stay with breathtaking views',
        price: 345
      },
      {
        ownerId: 10,
        address: "1010 Peak Path",
        city: 'Annapurna',
        state: 'Nepal',
        country: 'Nepal',
        lat: 33.1234567,
        lng: -44.1234567,
        name: 'Eco Village',
        description: 'Eco-friendly nepalese stay in with great landscape',
        price: 79
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
