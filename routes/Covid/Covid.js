const CheckStoreStatusAndSave = require('./factory');
const router = require('express').Router();
const store = require('./store.json');
const GetApiData = require('./api');
const fs = require('fs');

CheckStoreStatusAndSave(store, GetApiData);

router.route('/').get((req, res) => {
    res.send(store).status(200);
});

module.exports = router;
