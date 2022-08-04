const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//~GET ALL SPOTS ~~WITHOUT LITERAL~~
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        group: ['Spot.id'],
        include: [{
            model: Review,
            attributes: []
        },
        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
            ],
        },

    })

    const allImages = await Image.findAll({
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
                    currentImageSpotId === currentSpot.id)
                    {
                    currentSpot.previewImage = currentImage.url
                }
            }
        }
    }

    res.json(allSpots)
    //STILLNEEDS decimal fixing on heroku
    //question: what if the spot has no images attached, do we still want a previewImageId?
});


//~GET SPOTS OF CURRENT USER ~~WITHOUT LITERAL~~
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const userId = user.id

    const allSpots = await Spot.findAll({
        group: ["Spot.id", "Owner.id"],
        where: { ownerId: user.id },
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: User, as: "Owner",
            attributes: []
        },

        ],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"],
            ],
        },

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
                    currentImageSpotId === currentSpot.id)
                    {
                    currentSpot.previewImage = currentImage.url
                }
            }
        }
    }

    res.json(allSpots)
    //STILLNEEDS decimal fixing on heroku?
    //STILLNEEDS to remove attributes firstname/lastname from query
    //question: having trouble limiting the attributes of whatever I'm calling findAll on
});


//~GET A SPOT BY ID ~~WITHOUT LITERAL~~
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;


    const allSpots = await Spot.findAll({
        group: ["Spot.id", "Owner.id"],
        where: { id : spotId },
        include: [{
            model: Review,
            attributes: []
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


    const allImages = await Image.findAll({
        group: ["Image.id", "Spot.id"],
        attributes: ['id', 'url'],
        include: [{
            model: Spot,
            attributes: ['id']
        }],
        order: ['id']
    })

    if (!allSpots[0]) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }



    //build out your own images array of objects, with id, imageableid, url
    let Images = []

    //iterating through allImages && allSpots, when the spotid for both matches,
    //add the url, imageableId, and url
    //iterate through allImages - even though it's technically an object, treat it like an array
    for (let i = 0; i < allImages.length; i++) {
        let currentImage = allImages[i].dataValues
        console.log('ALLIMAGES', 'I', i,  currentImage  )
        //check if the current Image has a spot Id
        let currentImageId = currentImage.id
        if (currentImage.Spot) {
            let currentImageSpotId = currentImage.Spot.id
            //iterate through all spots
            for (let i = 0; i < allSpots.length; i++) {
                let currentSpot = allSpots[i].dataValues
                //if the image's spotId matches up with the spot's id
                //push that mf in the array
                if (currentImageSpotId === currentSpot.id) {
                    Images.push({
                        id: currentSpot.id,
                        imageableId: currentSpot.id,
                        url: currentImage.url
                    })
                }
            }
        }
    }


    if (allSpots[0].dataValues.id) {
        allSpots[0].dataValues.Images = Images
        res.json(allSpots)
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

})
//STILLNEEDS heroku decimal fix


//~CREATE A SPOT
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

//~ADD IMAGE TO SPOT BASED ON SPOT ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id
    const { url, previewImage } = req.body
    const user = await User.findByPk(userId)

    // SPOT NOT FOUND
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // AUTHORIZATION
    if (spotExist.ownerId !== userId) {
        res.status(403)
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

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


//~EDIT A SPOT
router.put('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    let errors = {}
    console.log('SPOTID', spotId)
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

    //SPOT NOT FOUND
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // AUTHORIZATION
    const userId = req.user.id
    if (spotExist.ownerId !== userId) {
        res.status(403)
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const spot = await Spot.findByPk(spotId)

    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price

    await spot.save();
    res.json(spot)
})


//~DELETE A SPOT BY ID
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;

    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const spot = await Spot.findByPk(spotId);

    await spot.destroy();

    res.status(200)
    res.json({
        message: "Successfully deleted",
        stausCode: 200
    })
})


//question: in postman, are we supposed to replace {{spotId}} with our own?



module.exports = router;
