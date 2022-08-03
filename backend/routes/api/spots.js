const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, sequelize } = require('../../db/models');
const app = require('../../app');

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
                //[sequelize.literal("Images.url"), "previewImage"]
            ],
        },
        include: [{
            model: Review,
            attributes: []
        },
        // {
        //     model: Image,
        //     attributes: []
        // }
        ],
        group: ['Spot.id']

    })
    res.json(allSpots)
});


// const allSpots = await Spot.findAll({
//     include: Review,
// });
// for (let i = 0; i < allSpots.length; i++) {
//     let spotsObj = allSpots[i].dataValues;
//     for (let key in spotsObj) {
//         if (true) {
//             let avgRatingArray = await Review.findOne({
//                 where: { spotId: spotsObj.id },
//                 attributes: {
//                     include: [
//                         [
//                             sequelize.fn("AVG", sequelize.col("stars")),
//                             "avgStarRating"
//                         ]
//                     ]
//                 }
//             })
//             spotsObj.avgRating = avgRatingArray.dataValues.avgStarRating;
//         }
//     }
// }
// return res.json({
//     allSpots
// })
// STILLNEEDS previewImg: images

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
        const currentSpots = await Spot.findAll({
            where: { ownerId: user.id }
        })
        for (let i = 0; i < currentSpots.length; i++) {
            let spotsObj = currentSpots[i].dataValues;
            for (let key in spotsObj) {
                if (true) {
                    let avgRatingArray = await Review.findAll({
                        where: { spotId: spotsObj.id },
                        attributes: {
                            include: [
                                [
                                    sequelize.fn("AVG", sequelize.col("stars")),
                                    "avgStarRating"
                                ]
                            ]
                        }
                    })
                    spotsObj.avgRating = avgRatingArray[0].dataValues.avgStarRating;
                }
            }
        }
        return res.json({
            currentSpots
        });
        //STILLNEEDS add preview img
    } else
        return res.json({});
}
);

router.get('/:spotId', async (req, res) => {
    res.json({
        message: "you're in spots/:spotId"
    })
})


module.exports = router;
