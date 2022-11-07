const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const { Spot, User, Review, Image, sequelize } = require('../../db/models');

//GET ALL REVIEWS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city',
                    'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: Image,
                attributes: ['id', ['id', 'imageableId'], 'url']
            },
        ]
    })

    res.json({ Reviews })
})


//ADD IMAGE TO REVIEW BASED ON REVIEWID
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id
    const { url, previewImage } = req.body
    const user = await User.findByPk(userId)

    // REVIEW NOT FOUND
    const reviewExist = await Review.findByPk(reviewId);
    if (!reviewExist) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    // AUTHORIZATION
    if (reviewExist.userId !== userId) {
        res.status(403)
        res.json({
            message: "Forbidden: Review must belong to current user",
            statusCode: 403
        })
    }

    //EXCEEDS MAX OF 10 IMAGES PER REVIEW
    const imagesOfReview = await Image.findAll({
        where: { reviewId: reviewId },
    })
    if (imagesOfReview.length >= 10) {
        res.status(403);
        return res.json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403
        })
    }

    const newImage = await Image.create({
        url: url,
        previewImage: previewImage,
        reviewId: reviewId,
        userId: userId
    })
    const response = {
        id: newImage.id,
        imageableId: reviewId,
        url: newImage.url
    }
    res.json(response)
})


module.exports = router;

//~EDIT A REVIEW
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { user } = req;
    const { review, stars } = req.body;

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

    //REVIEW NOT FOUND
    const reviewExist = await Review.findByPk(reviewId);
    if (!reviewExist) {
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    // AUTHORIZATION
    const userId = req.user.id
    if (reviewExist.userId !== userId) {
        res.status(403)
        res.json({
            message: "Forbidden: Review must belong to current user",
            statusCode: 403
        })
    }

    const reviewCurrent = await Review.findByPk(reviewId)

    reviewCurrent.review = review
    reviewCurrent.stars = stars

    await reviewCurrent.save();
    res.json(reviewCurrent)
})


//~DELETE A REVIEW BY ID
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const reviewExist = await Review.findByPk(reviewId);

    //REVIEW NOT FOUND
    if (!reviewExist) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    // AUTHORIZATION
    const userId = req.user.id
    if (reviewExist.userId !== userId) {

        res.status(403)
        return res.json({
            message: "Forbidden: Review must belong to current user",
            statusCode: 403
        })
    }

    const review = await Review.findByPk(reviewId);
    await review.destroy();
    res.status(200)
    return res.json({
        message: "Successfully deleted",
        stausCode: 200
    })
})
