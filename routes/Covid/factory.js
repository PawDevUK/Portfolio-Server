const fs = require('fs');

function CheckStoreStatus(store, FetchData) {
    const LocalStoreStatus = store.status;
    if (!LocalStoreStatus) {
        (async function CheckApiStatusIfOkSave() {
            const data = await FetchData;
            if (data.status === 'ok') {
                (async function SaveDataToLocalStore(GetData) {
                    fs.writeFile('./routes/Covid/store.json', JSON.stringify(await GetData), (err) => {
                        console.log(err);
                    });
                })(data);
            } else 'Not saved';

            return;
        })();
    } else {
        console.log('data already in a store.json');
    }
}

module.exports = CheckStoreStatus;
