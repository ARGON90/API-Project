const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User } = require('../../db/models')

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots)
    // previewImg: images
    // avgstars from reviews
})

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    if (user) {
        const currentSpots = await Spot.findAll ({
            where: {ownerId: user.id}

        })
        return res.json({currentSpots});

    } else return res.json({});
    //add avg rating,
    //add preview img
}
);

module.exports = router;
