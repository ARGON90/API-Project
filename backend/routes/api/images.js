const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    const userId = req.user.id
    const thisImage = await Image.findByPk(imageId)

    //IMAGE DOESN'T EXIST
    if (!thisImage) {
        res.status(404)
        res.json({
            message: "Image couldn't be found",
            statusCode: 404
        })
    }

    //AUTHORIZATION: IMG MUST BELONG TO CURRENT USER
    if (thisImage.userId != userId) {
        res.status(403)
        res.json({
            message: "Forbidden: Image must belong to current user",
            statusCode: 403
        })
    }


    await thisImage.destroy();
    res.status(200)
    res.json({
        message: "Successfully Deleted",
        statusCode: 200
    })
})


module.exports = router;
