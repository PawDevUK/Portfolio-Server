const CheckStoreStatusAndSave = require('./factory');
const router = require('express').Router();
const store = require('./store.json');
const GetNewsData = require('./api');
const fs = require('fs');

router.route('/newsUK').get((req, res) => {
    CheckStoreStatusAndSave(store, GetNewsData);
    res.send(store.articles).status(200);
});
router.route('/stats').get((req, res) => {
    res.send('stats').status(200);
});

module.exports = router;
