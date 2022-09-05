const router = require('express').Router();
const mongoose = require('mongoose');
// require('dotenv').config();

router.route('/').get((req, res) => {
    res.send('GET ChatBot');
});

router.route('/').post((req, res) => {
    res.send('POST ChatBot');
});

module.exports = router;
