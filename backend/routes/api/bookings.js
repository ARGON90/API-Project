const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Bookings = await Booking.findAll({
        where: { userId : user.id },
    })

    const allSpots = await Spot.findAll({
        group: ["Spot.id"],
        attributes: ['id', 'ownerId', 'address', 'city',
                    'state', 'country', 'lat', 'lng', 'name', 'price'],
        where: { ownerId: user.id },
        include: [{
            model: Review,
            attributes: []
        },
        ],
    })

    const allImages = await Image.findAll({
        group: ["Image.id", "Spot.id"],
        attributes: ['id', 'url', 'previewImage'],
        include: [{
            model: Spot,
            attributes: ['id']
        }],
        order: ['id']
    })

    //iterating through allImages && allSpots, when the spotid for both matches, add the url
    //iterate through allImages - even though it's technically an object, treat it like an array
    for (let i = 0; i < allImages.length; i++) {
        let currentImage = allImages[i].dataValues
        //check if the current Image has a spot Id
        let currentImageId = currentImage.id
        if (currentImage.Spot) {
            let currentImageSpotId = currentImage.Spot.id
            //iterate through all spots
            for (let i = 0; i < allSpots.length; i++) {
                let currentSpot = allSpots[i].dataValues
                //if the spot doesn't have the previewImage attribute
                //AND the image's spotId matches up with the spot's id
                if (currentImage.previewImage === true &&
                    !currentSpot.previewImage &&
                    currentImageSpotId === currentSpot.id) {
                    currentSpot.previewImage = currentImage.url
                }
            }
        }
    }
    Bookings[0].dataValues.Spot = allSpots

    res.json({Bookings})
})


//GET BOOKINGS FOR SPOT BASED ON SPOT ID
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Bookings = await Booking.findAll({
        where: { userId : user.id },
    })

    const allSpots = await Spot.findAll({
        group: ["Spot.id"],
        attributes: ['id', 'ownerId', 'address', 'city',
                    'state', 'country', 'lat', 'lng', 'name', 'price'],
        where: { ownerId: user.id },
        include: [{
            model: Review,
            attributes: []
        },
        ],
    })

    const allImages = await Image.findAll({
        group: ["Image.id", "Spot.id"],
        attributes: ['id', 'url', 'previewImage'],
        include: [{
            model: Spot,
            attributes: ['id']
        }],
        order: ['id']
    })

    //iterating through allImages && allSpots, when the spotid for both matches, add the url
    //iterate through allImages - even though it's technically an object, treat it like an array
    for (let i = 0; i < allImages.length; i++) {
        let currentImage = allImages[i].dataValues
        //check if the current Image has a spot Id
        let currentImageId = currentImage.id
        if (currentImage.Spot) {
            let currentImageSpotId = currentImage.Spot.id
            //iterate through all spots
            for (let i = 0; i < allSpots.length; i++) {
                let currentSpot = allSpots[i].dataValues
                //if the spot doesn't have the previewImage attribute
                //AND the image's spotId matches up with the spot's id
                if (currentImage.previewImage === true &&
                    !currentSpot.previewImage &&
                    currentImageSpotId === currentSpot.id) {
                    currentSpot.previewImage = currentImage.url
                }
            }
        }
    }
    Bookings[0].dataValues.Spot = allSpots

    res.json({Bookings})
})









module.exports = router;
