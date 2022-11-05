'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [

      // IMAGES FOR SPOT 1
      {
        url: 'https://a0.muscache.com/im/pictures/abf7385e-8f73-4c1b-aade-b99d9b01ab35.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-27230120/original/47dcdc8c-a1b8-47f2-a097-4cbd3e835348.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-27230120/original/97d27b85-56f6-4b2a-b4d0-9726827286f6.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-27230120/original/f509a732-175c-4b3b-b31e-d076ad813f10.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-27230120/original/2bd6106c-a79c-476e-8362-593d2fb2e7e2.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 1,
        spotId: 1,
      },

      // IMAGES FOR SPOT 2
      {
        url: 'https://a0.muscache.com/im/pictures/b130dc12-d4fd-41d6-bc82-b37faaf2f8b4.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/fc5e1dc2-b212-4587-af20-44a501d9f26c.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ced662f1-d8a8-4904-8c39-7bb8c982cf27.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/325ffb83-cd43-4110-b441-dafbf3a8fc22.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ccb1262f-de70-4b51-90e1-8c2118c5ad7e.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 2,
        spotId: 2,
      },

      // IMAGES FOR SPOT 3
      {
        url: 'https://a0.muscache.com/im/pictures/e540aae9-9800-4c18-9da2-dda412f8cd0a.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 3,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/77c57ff5-6b48-4b96-b073-005f7353326a.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 3,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/107f3f43-a406-46b9-a7c3-3604e1a7ab2b.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 3,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/4c74d806-99c5-4bbe-9ea7-8d4b4e376b77.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 3,
        spotId: 3,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/49cc99e5-3de0-482b-84e2-0fd8bba30794.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 3,
        spotId: 3,
      },

      // IMAGES FOR SPOT 4
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46392684/original/3cf8b1b6-e7ea-4b4a-982a-d5c1b7c1d4b8.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 4,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46392684/original/4d25e33d-c751-44dc-8c25-4c0dbda6aa57.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 4,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46392684/original/14876a89-10d9-4dbf-a761-4eef1dc1bbec.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 4,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46392684/original/4e691d1c-6232-4730-97f0-14303d0d2a2e.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 4,
        spotId: 4,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46392684/original/a22429c1-b14f-4859-a75a-9acb496a0a98.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 4,
        spotId: 4,
      },

      // IMAGES FOR SPOT 5
      {
        url: 'https://a0.muscache.com/im/pictures/156af448-813c-4a5c-8d4e-98c4d797863c.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 5,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577945698684557697/original/ef20a3a6-431d-4b86-9692-e613c3dc2f75.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 5,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577945698684557697/original/b747cf8f-344f-4d36-a0bb-fabf17240c2c.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 5,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ab5997a8-69df-4225-8b2d-3dfdf43b6f05.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 5,
        spotId: 5,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-577945698684557697/original/9c82dec7-bfa8-4e1b-909f-e4e4570771f6.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 5,
        spotId: 5,
      },

      // IMAGES FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/d7f2828f-3287-4d8c-ba1a-8222e0dfdbdc.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 6,
        spotId: 6,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/b112c5d3-7773-4a53-b592-204c9e6b9b4c.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 6,
        spotId: 6,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/181a037a-70d8-4d72-9093-499d5477b005.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 6,
        spotId: 6,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/b182997c-c5b6-4cba-ab4a-52c6c4dccf67.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 6,
        spotId: 6,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/20a20cc1-2ec9-4492-b3eb-652ffcb83b32.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 6,
        spotId: 6,
      },
      // IMAGES FOR SPOT 7
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-533652361841726660/original/d86f0737-fbaa-4fae-b96f-227d2798e538.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 7,
        spotId: 7,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-533652361841726660/original/3ba27283-b2d7-4aea-9423-c41b05197413.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 7,
        spotId: 7,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-533652361841726660/original/b91937c5-1f48-4b08-b844-03e425d70794.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 7,
        spotId: 7,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-533652361841726660/original/4181952f-a4f2-4f48-911b-47f5af986d8e.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 7,
        spotId: 7,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-533652361841726660/original/0e0add57-54f8-4bec-89cc-7a7647c1def2.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 7,
        spotId: 7,
      },
      // IMAGES FOR SPOT 8
      {
        url: 'https://a0.muscache.com/im/pictures/87396b1d-2226-4d61-8804-b32f97d693ff.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 8,
        spotId: 8,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/8da9c5d2-efc5-41b1-87c0-9f5414c4ce25.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 8,
        spotId: 8,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/bc5538e3-4217-44b0-b9d2-38c64b420648.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 8,
        spotId: 8,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8264975/original/f0dd337d-d6de-4d1a-8f43-bc96964ac8b6.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 8,
        spotId: 8,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-8264975/original/7ddf7028-21d2-4b9d-9010-3d3ffdb84801.jpeg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 8,
        spotId: 8,
      },
      // IMAGES FOR SPOT 9
      {
        url: 'https://a0.muscache.com/im/pictures/e8f9ecff-9d21-4472-8f5c-ec66752a27bb.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 9,
        spotId: 9,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/90f23568-8aab-4e9a-b728-15a30f707b13.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 9,
        spotId: 9,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ae3b6a4a-f041-4736-9c15-8136b2820a3f.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 9,
        spotId: 9,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/5327762f-be5a-48d5-aac6-091c043d83ee.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 9,
        spotId: 9,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/47875ef0-d614-4007-991c-9f6c07eb2e83.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 9,
        spotId: 9,
      },
      // IMAGES FOR SPOT 10
      {
        url: 'https://a0.muscache.com/im/pictures/c33bb360-7091-4a0d-8e9f-edb51c76c8ba.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 10,
        spotId: 10,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/f8d4ab63-c391-44a4-bb2d-028487a6c877.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 10,
        spotId: 10,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/04e64949-7d48-484c-94fd-f8a0896a88c2.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 10,
        spotId: 10,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/4d43c13e-d817-489a-9c2f-0e351fafe717.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 10,
        spotId: 10,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/b0cca1ff-f5fe-43d6-af8f-e4a1a101a482.jpg?im_w=720',
        previewImage: true,
        reviewId: null,
        userId: 10,
        spotId: 10,
      },


      // REVIEW IMG FOR SPOT 3
      {
        url: 'https://a0.muscache.com/im/pictures/b4c66583-ff35-48ba-a6c2-9b75d7a2e946.jpg?im_w=720',
        previewImage: true,
        reviewId: 7,
        userId: 1,
        spotId: null,
      },
      // REVIEW IMG FOR SPOT 4
      {
        url: 'https://a0.muscache.com/im/pictures/d27d41c0-2119-4f46-b49a-f5fd6fcaef1c.jpg?im_w=720',
        previewImage: true,
        reviewId: 19,
        userId: 1,
        spotId: null,
      },
      // REVIEW IMG FOR SPOT 6
      {
        url: 'https://a0.muscache.com/im/pictures/984f85a9-4b88-438b-be39-948b0e7fa992.jpg?im_w=720',
        previewImage: true,
        reviewId: 25,
        userId: 1,
        spotId: null,
      },
    ])
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images');

  }
};
