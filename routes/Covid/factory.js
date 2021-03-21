const fs = require('fs');

function CheckStoreStatusAndSave(store, FetchData, file) {
    const LocalStoreStatus = store.status;
    if (!LocalStoreStatus) {
        (async function CheckApiStatusIfOkSave() {
            const data = await FetchData;

            if (data.status === 'ok') {
                (async function SaveDataToLocalStore(GetData) {
                    fs.writeFile(`./routes/Covid/Store/${file}.json`, JSON.stringify(await GetData), (err) => {
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
