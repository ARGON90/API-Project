const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

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
                model: Image,
                attributes: ['id', 'url'],
                attributes: {
                    include: [
                        [sequelize.literal("Spot.id"), "imageableId"],
                    ],
                }
            },
            {
                model: User, as: "Owner",
                attributes: ['id', 'firstName', 'lastName']
            },
        ],
        // attributes: {
        //     include: [
        //         [sequelize.literal("Spot.id"), "imageableId"],
        //     ],
        // }
    })

    const avgRating = await Spot.findOne({
        where: { id: spotId },
        include: [{
            model: Review,
            attributes: []
        },
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
            ],
        },
        group: ['Spot.id']
    })
    const avgStarRating = avgRating.dataValues.avgRating


    if (spotInfo[0].dataValues.id) {
        res.json({ spotInfo, avgStarRating })
        //STILLNEEDS imageable attribute how to get it formatted correctly
        //STILLNEEDS heroku decimal fix
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

})
//Question: why is the attributes for avgstar rating limiting the number of images I can display?


// const validateCreation = [
//     check('address')
//         .exists({ checkFalsy: true })
//         .withMessage('Street address is required'),
//     check('state')
//         .exists({ checkFalsy: true })
//         .withMessage('State is required'),
//     check('name')
//         .exists({ checkFalsy: true })
//         .isLength({ max: 50 })
//         .withMessage('Name must be less than 50 characters'),
//     handleValidationErrors
// ];

router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    let errors = {}
    const { address, city, state, country, lat,
        lng, name, description, price } = req.body;

    if (!address) errors.address = "Street address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (!country) errors.country = "Country address is required"
    if (typeof lat != 'number') errors.lat = "Latitude is not valid"
    if (typeof lng != 'number') errors.lng = "Longitude is not valid"
    if (!name) errors.name = "Name is required"
    if (name.length >= 50) errors.name = "Name must be less than 50 characters"
    if (!description) errors.description = "Description is required"
    if (!price) errors.price = "Price is required"

    if (Object.keys(errors).length != 0) {
        res.status(400)
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

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



    res.status(201)
    return res.json(newSpot)
})
//question: are there uniqueness constraints on any of these?

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id
    const { url, previewImage } = req.body
    const user = await User.findByPk(userId)

    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // authorization
    // if (!user) {
    //     res.status(403)
    //     res.json({
    //         message: "TEMPORARY MESSAGE: USER DOESN'T EXIST",
    //         statusCode: 403
    //     })
    //     //STILLNEEDS proper error messaging and authentication
    // }
    //question: spot must belong to the current user: make a query for that or...?

    const newImage = await Image.create({
        url: url,
        previewImage: previewImage,
        spotId: spotId,
        userId: userId
    })
    const response = {
        id: newImage.id,
        imageableId: spotId,
        url: newImage.url
    }
    res.json(response)
})











//question: in postman, are we supposed to replace {{spotId}} with our own?



module.exports = router;
