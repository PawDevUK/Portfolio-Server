const router = require('express').Router();
const store = require('./store.json');
const GetData = require('./api');
const fs = require('fs');

async function SaveData() {
    try {
        fs.writeFileSync('./routes/Covid/store.json', JSON.stringify(await GetData));
    } catch (e) {
        console.log(e);
    } finally {
        console.log('data is added to file');
    }
}

async function IfStatusOKAssign(FetcheData, Save) {
    const data = await FetcheData;
    if (data.status === 'ok' && !store.status) {
        Save();
    } else 'Not saved';
}

IfStatusOKAssign(GetData, SaveData);

router.route('/').get((req, res) => {
    res.send(store).status(200);
});

module.exports = router;
