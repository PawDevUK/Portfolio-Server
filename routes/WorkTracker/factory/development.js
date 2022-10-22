const fs = require('fs');
const FY = require('../store/fullYearCalendar.json')



function writeFullYear(payload, start_Time) {
    if (FY.length === 0 || FY[0].calendar[0].start !== payload[0].calendar[0].start_Time) {
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