const fs = require('fs');

function CheckStoreStatusAndSave(store, FetchData) {
    const LocalStoreStatus = store.status;
    if (!LocalStoreStatus) {
        (async function CheckApiStatusIfOkSave() {
            const data = await FetchData;
            if (data.status === 'ok') {
                (async function SaveDataToLocalStore(GetData) {
                    fs.writeFile('./routes/Covid/Store/news.json', JSON.stringify(await GetData), (err) => {
                        console.log(err);
                    });
                })(data);
            } else console.log('Not saved');

            return;
        })();
    } else {
        console.log('data already in a store.json');
    }
}

exports.CheckStoreStatusAndSave = CheckStoreStatusAndSave;
