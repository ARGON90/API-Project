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
    //STILLNEEDS decimal fixing on heroku
});

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const allSpots = await Spot.findAll({
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
    //STILLNEEDS decimal fixing on heroku

});

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spotInfo = await Spot.findAll({
        where: { id: spotId },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: ['id', 'url']
            },
            {
                model: User, as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            },
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
            ],
        },

    })
    if (spotInfo[0].dataValues.id) {
        res.json(spotInfo)
        //STILLNEEDS imageable attribute - what even is that?
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

})
//Question: why is the attributes for avgstar rating limiting the number of images I can display?

router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id

    const { address, city, state, country, lat,
        lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    const spotResult = await Spot.findAll({
        where: {address: address}
    })
    res.status(201)
    return res.json(spotResult)
})
//question: is using the address cheating for findAll...?

module.exports = router;
