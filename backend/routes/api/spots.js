const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const app = require('../../app');

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        group: ['Spot.id'],
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: Image,
            attributes: []
        }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
                [sequelize.literal("Images.url"), "previewImage"]
            ],
        },

    })
    res.json(allSpots)
    //STILLNEEDS decimal fixing
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const allSpots = await Spot.findAll({
        group: ['Spot.id'],
        where: { ownerId: user.id },
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: Image,
            attributes: []
        }
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
                [sequelize.literal("Images.url"), "previewImage"]
            ],
        },

    })
    res.json(allSpots)
    //STILLNEEDS decimal fixing
    //STILLNEEDS preview image
});

router.get('/:spotId', async (req, res) => {
    res.json({
        message: "you're in spots/:spotId"
    })
})


module.exports = router;
