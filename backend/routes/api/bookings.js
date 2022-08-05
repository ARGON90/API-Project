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
        where: { userId: user.id },
    })

    console.log('BOOKINGS', Bookings)

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
    console.log('BOOKINGS', Bookings)
    Bookings[0].dataValues.Spot = allSpots

    res.json({ Bookings })
})




//EDIT BOOKINGS FOR SPOT BASED ON SPOT ID
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const starterDate = new Date(startDate)
    const enderDate = new Date(endDate)

    //BOOKING VALIDATION CHECK: ENDDATE BEFORE STARTDATE
    let errors = {}
    if (startDate >= endDate) errors.endDate = "EndDate cannot be on or before startDate"
    if (Object.keys(errors).length != 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    //BOOKING NOT FOUND
    const thisBooking = await Booking.findByPk(bookingId);
    if (!thisBooking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    };

    //VALIDATION: CAN'T EDIT BOOKING THAT'S PAST END DATE
    let today = new Date();
    if (today >= enderDate) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    //VALIDATION: BOOKING DATE CONFLICT
    let spotId = thisBooking.spotId
    const allBookingTimes = await Booking.findAll({
        where: { spotid: spotId },
        attributes: ['startDate', 'endDate'],
    })
    errors = {}
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

    thisBooking.startDate = startDate
    thisBooking.endDate = endDate
    res.status(200)
    return res.json(thisBooking)
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const thisBooking = await Booking.findByPk(bookingId);

    // AUTHORIZATION SPOT OWNER
    //need to make a query to determine who owns the spot of this booking
    const thisBookingSpot = await Booking.findAll({
        where: { id: bookingId },
        include: Spot
    })
    let ownerId = thisBookingSpot[0].dataValues.Spot.ownerId
    const userId = req.user.id
    if (ownerId = userId) {
        await thisBooking.destroy();
        res.status(200);
        return res.json({
            message: "Successfully Deleted",
            statusCode: 200
        })
    }


    // AUTHORIZATION FOR USER
    if (thisBooking.userId === userId) {
       await thisBooking.destroy();
        res.status(200);
        res.json({
            message: "Successfully Deleted",
            statusCode: 200
        })
    };
    //AUTH: user OR spot must belong to current user"

    //BOOKING NOT FOUND
    if (!thisBooking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    };

    //BOOKING STARTED CAN'T BE DELETED
    const startDate = thisBooking.startDate
    const starterDate = new Date(startDate);
    let today = new Date();
    if (today >= starterDate) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }
    //STILLNEEDS testing here

    res.status(403)
    return res.json({
        message: "Forbidden: Booking or Spot must belong to the current user",
        status: "403"
    })
})



module.exports = router;
