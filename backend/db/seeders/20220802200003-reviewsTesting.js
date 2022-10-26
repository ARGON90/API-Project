'use strict';

const comments = [
  {review: 'Thank you for staying in your wonderful home, hope to return soon.',
  stars: 4},
  {review: 'One of the best places I haveve ever stayed in. Easy check-in, beautiful interior design, super clean and an unmatched view. Will be back!',
  stars: 4},
  {review: 'This place is amazing. Very clean, spacious, with everything you need to have a great time. ',
  stars: 5},
  {review: 'Wonderful cabin! Great location and impeccably designed. So many nice little amenities and feautures. We had a blast. Thanks again!',
  stars: 5},
  {review: 'Incredible place, gorgeous view, very thoughtfully designed. HIGHLY recommend! :)',
  stars: 5},
  {review: 'This place is absolutely stunning with a great location! We hosted a one night wellness bachelorette and it was the perfect setting. Thanks for having us!',
  stars: 5},
  {review: 'Place is beautiful in person! Looking forward to visiting again in the near future. The Host was very helpful during the trip.',
  stars: 5},
  {review: 'Had a lovely stay here and it was the perfect place to work and spend my last few days in town! Beautiful space with serene atmosphere would definitely return one day',
  stars: 5},
  {review: 'Such a beautiful property in such a beautiful part of the world. This place is magical. We had a blast. The rooms were a bit small though.',
  stars: 4},
  {review: 'I have spent a lot of time at a lot of homes and this one is good in terms of quality and location. Not exceptional, but good',
  stars: 4},
  {review: 'This place really is a bit smaller than the images. Great view, love the decoration, but I think the pictures were misleading.',
  stars: 3},
  {review: 'Good host, beautiful location, you cant go wrong. Would book again, thank you for everything!',
  stars: 4},
  {review: 'This place wasn not ideal for getting ready for my wedding. For some reason it was noisy. A beautiful view though.',
  stars: 3},
  {review: 'Lovely house. Great energy and cool rustic surroundings. Everything was easy. Highly recommend.',
  stars: 4},
  {review: 'A pretty neat place. Host could have been more responsive though. We enjoyed our stay nonetheless. Beautiful inside and outside. And very clean!',
  stars: 3},
  {review: 'Would highly recommend this town, but not this place. Check in was disorganized, and I felt rushed.',
  stars: 2},
  {review: 'The views were spectactular but for some reason, this places smells like Onions? Weird.',
  stars: 2},
  {review: 'Beautiful home up in the canyon with a wonderful view. However, the host forgot to clean and it was messy when we got there.',
  stars: 2},
  {review: 'The host completely ignored us and the place is a lot smaller than what the pictures showed. I do not recommend this place',
  stars: 1},
  {review: 'Beautiful space to be with family and relax. Excellent communication and clear expectations. We held a small birthday dinner and loved our time.',
  stars: 4},
  {review: 'This cabin is truly the best, filled with such cute decorations and it is perfect for 6 people! ',
  stars: 4},
  {review: 'One of the best places I haveve ever stayed in. Easy check-in, beautiful interior design, super clean and an unmatched view. Will be back!',
  stars: 5},
  {review: 'This place is exceptionally nice. Great open airy design and wonderful attention to detail. Very clean, comfortable and quiet. Highly recommended.',
  stars: 5},
  {review: 'Was not a fan of this home.... I do not think the host represented it well in the pictures. Lovely view though.',
  stars: 3},
]

let randInt;
function randomNum() {
  randInt = Math.floor(Math.random() * comments.length)
  return randInt
}



module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Reviews', [

    // REVIEWS FOR SPOT 1
     {
       review: `${comments[randomNum()].review}`,
       stars: comments[randInt].stars,
       userId: 2,
       spotId: 1,
     },
     {
       review: `${comments[randomNum()].review}`,
       stars: comments[randInt].stars,
       userId: 3,
       spotId: 1,
     },
     {
       review: `${comments[randomNum()].review}`,
       stars: comments[randInt].stars,
       userId: 4,
       spotId: 1,
     },
     {
       review: `${comments[randomNum()].review}`,
       stars: comments[randInt].stars,
       userId: 5,
       spotId: 1,
     },
     {
       review: `${comments[randomNum()].review}`,
       stars: comments[randInt].stars,
       userId: 6,
       spotId: 1,
     },
     {
       review: `${comments[randomNum()].review}`,
       stars: comments[randInt].stars,
       userId: 7,
       spotId: 1,
     },

     // REVIEWS FOR SPOT 2
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 1,
      spotId: 2,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 3,
      spotId: 2,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 4,
      spotId: 2,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 5,
      spotId: 2,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 6,
      spotId: 2,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 7,
      spotId: 2,
    },

    // REVIEWS FOR SPOT 3
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 4,
      spotId: 3,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 5,
      spotId: 3,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 6,
      spotId: 3,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 7,
      spotId: 3,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 8,
      spotId: 3,
    },
    {
      review: `${comments[randomNum()].review}`,
      stars: comments[randInt].stars,
      userId: 9,
      spotId: 3,
    },



   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews')
  }
};
