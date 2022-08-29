'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [

      // IMAGES FOR SPOT 1
      {
        url: 'https://a0.muscache.com/im/pictures/963301f9-b42d-426d-bc03-550ddddae1b3.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/6651b22b-7f90-4fd9-884b-146677668f1f.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-28666318/original/203ce869-5e0f-4f16-8baf-69e4227f9270.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/4cf73850-7c29-4fdd-8306-df97179d1e0a.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/58ca000b-3787-4765-8f53-d824bab76cc2.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },

      // IMAGES FOR SPOT 2
      {
        url: 'https://a0.muscache.com/im/pictures/34b94d56-6d67-4bf8-81b5-18cc082d7759.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/48d5c2a6-7dfb-4d13-aa29-397cdff311c9.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/48c67c24-61af-4f3d-8cfd-035592b7e52c.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47990115/original/b0764882-ba11-48ae-a0f0-b8e46cd5e843.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-588396913325901633/original/e6c29d47-4af7-4882-8ce0-7ff21f399359.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },

      // IMAGES FOR SPOT 3
      {
        url: 'https://a0.muscache.com/im/pictures/93bdd275-9284-4b9f-b8f0-c2dce31ed1af.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/76577236/1805ea4b_original.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18521472/original/cc64ca93-f311-40ce-b085-cd7aeb3dae55.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/34b94d56-6d67-4bf8-81b5-18cc082d7759.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21351815/original/b7b4a532-5995-47a6-a428-7212413c6042.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 3,
      },

      // IMAGES FOR SPOT 4
      {
        url: 'https://a0.muscache.com/im/pictures/8bfff805-930f-4e55-92ec-f74927d3e8e7.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/614ff388-18df-4687-a4e0-6505ac34c24e.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/7e416e40-eccc-44be-a6cf-8d287d71647c.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-39224892/original/3c176a26-c425-4fec-893b-34991301ce3b.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/3545558f-2ec1-4cdb-b239-d5e32e13ff3e.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 4,
      },

      // IMAGES FOR SPOT 5
      {
        url: 'https://a0.muscache.com/im/pictures/feac4021-d60e-4717-8ca6-f0c95ce16de3.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/14326715-ad56-405c-9142-32042b757fc2.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/eda565d4-00fb-45ec-b40c-25466828dadf.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/7555aaf4-ad4b-47d6-a56c-0af7ee3f47e1.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-408145/original/b398bc8f-ec1b-44ba-9f5f-6d8d36d42e9b.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 5,
      },

      // IMAGES FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/c7b59bf5-2c2a-40b3-8e16-2a22b973ff15.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 6,
      },
      // IMAGES FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50526394/original/bf5d6af2-25bc-466c-8fc7-24679249be98.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 6,
      },
      // IMAGES FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/994db556-d9e8-44a5-9b93-69f1b5d9ab35.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 6,
      },
      // IMAGES FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/2dafbde5-f091-46d1-9acd-7fe29f086495.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 6,
      },
      // IMAGES FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-520423092698514365/original/0e862a92-f026-4216-9051-32b28cb1851a.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 6,
      },


      // REVIEW IMG FOR SPOT 1
      {
        url: 'https://a0.muscache.com/im/pictures/364ec95d-44aa-46fc-a123-7f0239c5522f.jpg?im_w=1440',
        previewImage: true,
        reviewId: 2,
        userId: 2,
        spotId: null,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/364ec95d-44aa-46fc-a123-7f0239c5522f.jpg?im_w=1440',
        previewImage: true,
        reviewId: 5,
        userId: 3,
        spotId: null,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/364ec95d-44aa-46fc-a123-7f0239c5522f.jpg?im_w=1440',
        previewImage: true,
        reviewId: 6,
        userId: 4,
        spotId: null,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/364ec95d-44aa-46fc-a123-7f0239c5522f.jpg?im_w=1440',
        previewImage: true,
        reviewId: 7,
        userId: 5,
        spotId: null,
      },


      // REVIEW IMG FOR SPOT 2
      {
        url: 'https://a0.muscache.com/im/pictures/f301d055-d272-4871-8754-9e90a27845bc.jpg?im_w=1440',
        previewImage: true,
        reviewId: 1,
        userId: 1,
        spotId: null,
      },

      // REVIEW IMG FOR SPOT 3
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
