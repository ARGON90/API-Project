const express = require('express');
const router = express.Router();

const { Spot } = require('../../db/models')

router.get('/', (req, res) => {
    res.json("hello!")
})

module.exports = router;
