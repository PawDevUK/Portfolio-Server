const CheckStoreStatusAndSave = require('./factory').CheckStoreStatusAndSave;
const GetGlobalData = require('./API/GlobalData');
const GetNewsData = require('./API/GlobalNews');
const router = require('express').Router();
const store_news = require('./Store/news.json');
const store_GB_data = require('./Store/news.json');

router.route('/newsUK').get((req, res) => {
    CheckStoreStatusAndSave(store_news, GetNewsData);
    res.send(store_news.articles).status(200);
});

router.route('/GB').get((req, res) => {
    (async () => {
        const data = await GetGlobalData('GB');
    })();

    res.send('stats').status(200);
});

module.exports = router;
