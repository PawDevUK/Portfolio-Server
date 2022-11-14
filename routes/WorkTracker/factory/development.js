const fs = require('fs');
const FY = require('../store/fullYearCalendar.json')

function writeFullYear(payload) {
        const p = JSON.stringify(payload);
        fs.writeFile(`${__dirname}/../store/fullYearCalendar.json`, p, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}
//** @function 
/** @name writeToResults
/function whites for better readability in development, full combination of days to 'result.js'
*/
function writeToResults(payload){
    const res = JSON.stringify(payload)
    fs.writeFile(`${__dirname}/../store/results.json`, res, err => {
            if (err) {
            console.error(err);
                }
        }
    )
}

module.exports = {
    writeToResults,
    writeFullYear,
}