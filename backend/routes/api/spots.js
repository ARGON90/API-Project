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
    //STILLNEEDS decimal fixing
    //STILLNEEDS preview image
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const allSpots = await Spot.findAll({
        where: { ownerId: user.id},
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

router.get('/:spotId', async (req, res) => {
    res.json({
        message: "you're in spots/:spotId"
    })
    //STILLNEEDS decimal fixing
    //STILLNEEDS preview image
})


module.exports = router;
