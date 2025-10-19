const fs = require('fs');
// const FY = require('../store/fullYearCalendar.json');

function writeToFile(payload,fileName) {
        const p = JSON.stringify(payload);
        fs.writeFile(`${__dirname}/../store/${fileName}`, p, (err) => {
            if (err) {
                console.error(err);
            }
        });
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

function checkIfOvertime(cal){
    let overtime = false;
    let listOfOvertimes = []
    cal.forEach(element => {
        element.calendar.forEach((day)=>{
           if(day.hours.overtime){
            overtime = true;
            listOfOvertimes.push(day)
           }
        })
    });
    if(overtime){
        return {overtime,listOfOvertimes}
    }else {
        return overtime
    }
}

// function extractDateFromString(str){
//     let date = [];
//     str.split(/[/" ":]/).forEach((i)=>{
//         date.push(parseInt(i))
//     })
//     return date
// };


module.exports = {
    writeToResults,
    writeToFile,
    checkIfOvertime,
}