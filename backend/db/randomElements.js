export let firstNames = ['Alex', 'Giordan', 'Tyler', 'Chen ', 'Cecilia', 'Edward',
    'Rudy', 'Jason', 'Randy', 'Ben', 'Justine', 'Julie', 'Alec', 'Connor',
    'Tiffany']

export let lastNames = ['Yang', 'Venida', 'Lam', 'Felipe', 'Jung', 'Jang', 'Jean',
    'Waldee', 'Chang', 'Nguyen', 'Ou', 'Maniti', 'Gonglach', 'Chen']

const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];

const randomNum = Math.floor(Math.random() * lastNames.length)



let comments = [
    {review: 'This place is absolutely stunning with a great location! We hosted a one night wellness bachelorette and it was the perfect setting. Thanks for having us!',
    stars: 5},
   { review: 'Place is beautiful in person! Looking forward to visiting again in the near future. The Host was very helpful during the trip.',
    stars: 5},
    {review: 'Had a lovely stay here and it was the perfect place to work and spend my last few days in town! Beautiful space with serene atmosphere would definitely return one day',
    stars: 5},
    {review: 'Such a beautiful property in such a beautiful part of the world. This place is magical. We had a blast. The Rooms were a bit small though.',
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
    stars: 4}
]

console.log(comments[randomNum])
