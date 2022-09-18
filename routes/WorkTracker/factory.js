const weekCombinations = require('./store').weekCombinations;
const moment = require('moment');
const fs = require('fs');

function extractDateFromString(str){
    let date = [];
    date.push(parseInt(str.slice(0,2)))
    date.push(parseInt(str.slice(3,str.length)))

    return date
}

function returnDate(date,extractDateFromString){
    let payload = [];
    date.forEach((i)=>{
        if(typeof i === 'string' && date.length === 1){
            payload = extractDateFromString(args[0])
        }else if (typeof i === 'string' && date.length >=2 ){
            payload.push(parseInt(i))
        }else if (typeof i === 'number'){
            payload.push(i)
        }
    })

    return moment([payload[1],payload[0]-1])
}

function getMonthName(m){
    return  moment().month(m).format('MMMM');
}

function checkIN(arr,day,weekDay){
    let IN = null
    if(arr.length >= 5){
        IN = true;
        arr.forEach((i)=>{
            if(i===day){
                IN = false
            }
        })
    }else if(arr.length === 2){
        IN = true;
        arr.forEach((i)=>{
            if(i===weekDay){
                IN = false
            }
        })
    }
   return IN
}

function getIn_OffDays(calendar){
    let num = {
        in:0,
        off:0
    };
    calendar.calendar.forEach((obj)=>{
        if(!obj.in){
            num.off++
        }else if(obj.in){
            num.in ++
        }
    })
    return num
}

function countDays(obj){
    let counter = {
        w:0,
        f:0,
        sa:0,
        su:0
    }
    const wd = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    obj.calendar.forEach((i)=>{
        if(i.in && (i.weekDay===wd[0] || i.weekDay===wd[1] || i.weekDay===wd[2] || i.weekDay===wd[3])){
            counter.w++
        }else if(i.weekDay===wd[4] && i.in){
            counter.f++
        }else if(i.weekDay===wd[5] && i.in){
            counter.sa++
        }else if(i.weekDay===wd[6] && i.in){
            counter.su++
        }
    })

    return counter
}

//** @function 
/** @name calcEarnedForDay at the moment this function calculate earnings for day only between 17:00 and 05:00
*/
function calcEarnedForDay(rates,calc){
    const {
        basic,
        nights,
        weekends
    } = rates

    let payload = {};
    function reduceFloat(payload){
        return parseFloat(payload.toFixed(2))
    }

    function weekDay(){
        const dayH = 5 * basic;
        const nightH = 4.25 * calc(basic,nights.percent);
        return dayH + nightH
    }
    function friday(){
        const dayH = 5 * basic;
        const nightH = 2 * calc(basic,nights.percent);
        const weekendH = 2.25 * calc(basic,weekends.percent);
        return dayH + nightH + weekendH 
    }
    function sat(){
        return 9.25 * calc(basic,weekends.percent);
    }
    function sun(){
        const weekendH = 7 * calc(basic,weekends.percent);
        const nightH = 2.25 * calc(basic,nights.percent)
        return weekendH + nightH
    }

    payload['weekDay'] = reduceFloat(weekDay())
    payload['friday'] = reduceFloat(friday())
    payload['sat'] = reduceFloat(sat())
    payload['sun'] = reduceFloat(sun())
    payload['noReduced'] = {
        weekDay: weekDay(),
        friday: friday(),
        sat:sat(),
        sun:sun()
    }

    return payload
}

function calcEarnedFor_Month(payload){
    let pay = payload.day_pay
    const weekDaysTotal = payload.IN_weekDays * pay.weekDay;
    const fridaysTotal = payload.IN_fri * pay.friday;
    const saturdayTotal = payload.IN_sat * pay.sat;
    const sundayTotal = payload.IN_sun * pay.sun;
    const Total = fridaysTotal + sundayTotal + weekDaysTotal + saturdayTotal;

    return {
        weekDaysTotal,
        fridaysTotal,
        saturdayTotal,
        sundayTotal,
        Total
    }
}

function getNameOfWeekDay(payload,i){
    const a =  moment(payload).date(i)
    return moment(a).format('dddd')
}


function checkPercentageFrom(main,fraction){
    let percent;
    let stPerce;

    let mainDivided = main/100

    percent = fraction / mainDivided

    stPerce = percent.toString().slice(0,4)

    return `${fraction} is ${stPerce} of ${main}`
}

function calcPercent(basic,extraRate){
    let extra = 0 
    extra = basic / 100 * extraRate
    return basic + extra
}

function createCalendarForYear(rota,createMonth){

    // get rota for all year
    // loop over year rota
    // create each month 
    // push created each calendar month to year array
    
    const year = []

    rota

    return year
}
function getCombinations(weekCombinations, createMonth){
    
    let result = []

    weekCombinations.forEach((i)=>{
        const rota = {
            date:[09,2022],
            OffDays:i
        }
       result.push(createMonth(rota))
    })

    return result
}
//** @function 
/** @name writeToResults
/function to make full combination of days off more clear to read by writing it to 'result.js'
*/
function writeToResults(payload){
    const res = JSON.stringify(payload)
    fs.writeFile('./results.json', res, err => {
            if (err) {
            console.error(err);
                }
        }
    )
}

module.exports = {
    extractDateFromString,
    returnDate,
    getMonthName,
    checkIN,
    getIn_OffDays,
    countDays,
    calcEarnedForDay,
    calcEarnedFor_Month,
    getNameOfWeekDay,
    calcPercent,
    getCombinations,
    writeToResults
}