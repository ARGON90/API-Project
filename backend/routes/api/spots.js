const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

//~GET ALL SPOTS ~~WITHOUT LITERAL~~ ~~WITH PAGINATION~~
router.get('/', async (req, res) => {

    let { page, size } = req.query;
    let errors = {}

    if (page < 0 || page > 10) errors.page = "Page Query Error: Page must be between 0 and 10"
    if (!page) page = 0;
    parseInt(page);

    if (!size) size = 20;
    parseInt(size);
    if (size < 0 || size > 20) errors.size = "Size Query Error: Size must be between 0 and 20"

    if (Object.keys(errors).length != 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    let limit;
    let offset;
    if (page >= 1 && size >= 1) {
        limit = size;
        offset = size * (page - 1);
    } else {
        limit = size,
            offset = 0;
    }

    //GET ALL SPOTS WITH PAGINATION INCLUDED
    const Spots = await Spot.findAll({
        group: ['Spot.id'],
        include: [{
            model: Review,
            attributes: []
        },
        ],
        limit: limit,
        offset: offset
    })

    //FETCH STAR RATINGS FOR ALL SPOTS, ADD INTO ALLSPOTS
    const allSpotsStar = await Spot.findAll({
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
    for (let i = 0; i < Spots.length; i++) {
        let avgRating = Number.parseFloat(allSpotsStar[i].dataValues.avgRating).toFixed(2)
        Spots[i].dataValues.avgRating = avgRating
    }

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
        //check if the current Image has a spot
        if (currentImage.Spot) {
            let currentImageSpotId = currentImage.Spot.id
            //iterate through all spots
            for (let i = 0; i < Spots.length; i++) {
                let currentSpot = Spots[i].dataValues
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

    res.json({ Spots, page, size })
    //question: what if the spot has no images attached, do we still want a previewImageId?
});


//~GET SPOTS OF CURRENT USER ~~WITHOUT LITERAL~~
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const userId = user.id

    const Spots = await Spot.findAll({
        group: ["Spot.id"],
        where: { ownerId: user.id },
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
    for (let i = 0; i < Spots.length; i++) {
        let avgRating = Number.parseFloat(Spots[i].dataValues.avgRating).toFixed(2)
        Spots[i].dataValues.avgRating = avgRating
    }



    const allImages = await Image.findAll({
        group: ["Image.id", "Spot.id"],
        attributes: ['id', 'url', 'previewImage'],
        include: [{
            model: Spot,
            attributes: ['id']
        }],
        order: ['id']
    })

    //iterating through allImages && Spots, when the spotid for both matches, add the url
    //iterate through allImages - even though it's technically an object, treat it like an array
    for (let i = 0; i < allImages.length; i++) {
        let currentImage = allImages[i].dataValues
        //check if the current Image has a spot Id
        let currentImageId = currentImage.id
        if (currentImage.Spot) {
            let currentImageSpotId = currentImage.Spot.id
            //iterate through all spots
            for (let i = 0; i < Spots.length; i++) {
                let currentSpot = Spots[i].dataValues
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

    res.json({ Spots })
});


//~GET A SPOT BY ID ~~WITHOUT LITERAL~~
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const allSpots = await Spot.findAll({
        group: ["Spot.id", "Owner.id"],
        where: { id: spotId },
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
    for (let i = 0; i < allSpots.length; i++) {
        let avgRating = Number.parseFloat(allSpots[i].dataValues.avgRating).toFixed(2)
        allSpots[i].dataValues.avgRating = avgRating
    }


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
        console.log('ALLIMAGES', 'I', i, currentImage)
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
    if (!price) errors.price = "Price per day is required"

    if (Object.keys(errors).length != 0) {
        res.status(400)
        return res.json({
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
            message: "Forbidden: Current User must own Spot",
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
            message: "Forbidden: Current user must own spot",
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
    const userId = req.user.id
    const thisSpot = await Spot.findByPk(spotId);

    //SPOT NOT FOUND
    if (!thisSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // AUTHORIZATION FOR NON-OWNER
    console.log('USERID', userId)
    if (thisSpot.ownerId !== userId) {
        res.status(403);
        return res.json({
            message: "Forbidden: Spot must belong to Current User",
            statusCode: 403
        })
    };

    const spot = await Spot.findByPk(spotId);
    await spot.destroy();
    res.status(200)
    res.json({
        message: "Successfully deleted",
        stausCode: 200
    })
})

//GET ALL REVIEWS BY A SPOT'S ID
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const thisSpot = await Spot.findByPk(spotId);

    //SPOT NOT FOUND
    if (!thisSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const Reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Image,
                attributes: ['id', ['id', 'imageableId'], 'url']
            },
        ]
    })

    res.json({ Reviews })
})

//CREATE A REVIEW FOR SPOT ON SPOT ID
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { user } = req;
    const { review, stars } = req.body;

    //SPOT NOT FOUND
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    //VALIDATION CHECK
    let errors = {}
    if (!review) errors.review = "Review text is required"
    if (!stars) errors.stars = "Stars must be an integer from 1 to 5"
    if (typeof stars != 'number') errors.stars = "Stars must be an integer from 1 to 5"
    if (stars > 5) errors.stars = "Stars must be an integer from 1 to 5"
    if (stars < 1) errors.stars = "Stars must be an integer from 1 to 5"
    if (Object.keys(errors).length != 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    //CHECK IF CURRENT USER HAS AN EXISTING REVIEW FOR THIS SPOT
    const spotReviews = await Spot.findAll({
        where: { id: spotId },
        include: [
            {
                model: Review,
                attributes: ['userId']
            }],
    })

    //ITERATE THROUGH ALL USER IDs OF CURRENT SPOT, SEE IF THAT MATCH CURRENT USER
    for (let i = 0; i < spotReviews[0].dataValues.Reviews.length; i++) {
        if (spotReviews[0].dataValues.Reviews[i].dataValues.userId === user.id) {
            res.status(403)
            return res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        }
    }

    const newReview = await Review.create({
        userId: user.id,
        spotId: spotId,
        review: review,
        stars: stars
    })

    await newReview.save()
    res.status(201)
    return res.json(newReview)
})
//potential heroku error: i added a spot, but it didn't show up in get reviews of current user

//GET BOOKINGS FOR SPOT BASED ON SPOT ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;

    //SPOT NOT FOUND
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    // AUTHORIZATION FOR NON-OWNER
    const userId = req.user.id
    if (spotExist.ownerId !== userId) {
        const Bookings = await Booking.findAll({
            where: { spotId: spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({ Bookings })
    };

    // AUTHORIZATION FOR OWNER
    if (spotExist.ownerId === userId) {
        const Bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        })
        return res.json({ Bookings })
    };
})

//CREATE BOOKING FOR SPOT BASED ON SPOT ID
router.post('/:spotId/bookings', requireAuth, async (req, res) => {

    const { spotId } = req.params;
    const { user } = req;
    const { startDate, endDate } = req.body;
    const starterDate = new Date(startDate)
    const enderDate = new Date(endDate)



    //VALIDATION: BOOKING DATE CONFLICT
    const allBookingTimes = await Booking.findAll({
        where: { spotId: spotId },
        attributes: ['startDate', 'endDate'],

    })
    let errors = {}
    for (let i = 0; i < allBookingTimes.length; i++) {
        let currentBookingTime = allBookingTimes[i].dataValues
        let currentStartDate = new Date(currentBookingTime.startDate)
        let currentEndDate = new Date(currentBookingTime.endDate)
        if (starterDate.getTime() >= currentStartDate.getTime() &&
            starterDate.getTime() <= currentEndDate.getTime()) {
            errors.startDate = "Start Date conflicts with booking"
        }
        // WOULDN'T PASS ERROR SPECS
        if (currentStartDate.getTime() >= starterDate.getTime() &&
            currentStartDate.getTime() <= enderDate.getTime()) {
            errors.dateConflict = `Date Conflict: this property is booked between ${currentStartDate} and ${currentEndDate}. Please try different dates`
        }
        if (enderDate.getTime() >= currentStartDate.getTime() &&
            enderDate.getTime() <= currentEndDate.getTime()) {
            errors.endDate = "End Date conflicts with booking"
        }
        // WOULDN'T PASS ERROR SPECS
        if (currentEndDate.getTime() >= starterDate.getTime() &&
            currentEndDate.getTime() <= enderDate.getTime()) {
            errors.dateConflict = `Date Conflict: this property is booked between ${currentStartDate} and ${currentEndDate}. Please try different dates`
        }
        if (Object.keys(errors).length != 0) {
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors
            })
        }
    }

    //SPOT NOT FOUND
    const spotExist = await Spot.findByPk(spotId);
    if (!spotExist) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    //VALIDATION CHECK ENDDATE BEFORE STARTDATE
    errors = {}
    if (startDate >= endDate) errors.endDate = "EndDate cannot be on or before startDate"
    if (Object.keys(errors).length != 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    //BOOKING CONFLICT CHECK
    if (startDate >= endDate) errors.endDate = "EndDate cannot be on or before startDate"
    if (Object.keys(errors).length != 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    // AUTHORIZATION FOR OWNER (ERROR)
    const userId = req.user.id
    if (spotExist.ownerId === userId) {
        res.status(403)
        return res.json({
            message: "Forbidden: Spot belongs to current user",
            statusCode: 403
        })
    };

    // AUTHORIZATION FOR NON-OWNER (SUCCESSFUL BOOKING)
    if (spotExist.ownerId !== userId) {
        const newBooking = await Booking.create({
            spotId: spotId,
            userId: userId,
            startDate: startDate,
            endDate: endDate,
        })
        await newBooking.save()
        res.status(200)
        return res.json(newBooking)
    };
});

module.exports = router;
