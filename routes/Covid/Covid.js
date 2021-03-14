const CheckStoreStatusAndSave = require('./factory');
const router = require('express').Router();
const store = require('./store.json');
const GetApiData = require('./api');
const fs = require('fs');

router.route('/').get((req, res) => {
    CheckStoreStatusAndSave(store, GetApiData);
    res.send(store.articles).status(200);
});

module.exports = router;
