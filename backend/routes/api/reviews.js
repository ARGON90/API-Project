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
        where: { userId : user.id },
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



module.exports = router;
