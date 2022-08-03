const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const app = require('../../app');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

router.get('/current', async (req, res) => {
    res.json("in reviews")
})

module.exports = router;
