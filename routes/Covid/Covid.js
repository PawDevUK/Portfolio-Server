const CheckStoreStatusAndSave = require('./factory').CheckStoreStatusAndSave;
const GetGlobalData = require('./API/GlobalData');
const GetNewsData = require('./API/GlobalNews');
const router = require('express').Router();
const store_news = require('./Store/news.json');
const store_GB_data = require('./Store/data_GB.json');

router.route('/newsUK').get((req, res) => {
    CheckStoreStatusAndSave(store_news, GetNewsData, 'news');
    res.send(store_news.articles).status(200);
});

router.route('/GB').get((req, res) => {
    CheckStoreStatusAndSave(store_GB_data, GetGlobalData('GB'), 'data_GB');
    res.send('stats').status(200);
});

module.exports = router;
