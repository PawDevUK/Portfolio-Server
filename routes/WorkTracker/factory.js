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

function getMonthNumber(name){
    return moment().month(name).format("M");
}

function reduceFloat(payload){
    return parseFloat(payload.toFixed(2))
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
function calcEarnedForDay(rates,calc,reduceFloat){
    const {
        basic,
        nights,
        weekends
    } = rates

    let payload = {};
    
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

    return payload
}

function calcEarnedFor_Month(payload, reduceFloat){
    let pay = payload.day_pay
    
    const weekDaysTotal = reduceFloat(payload.IN_weekDays * pay.weekDay);
    const fridaysTotal = reduceFloat(payload.IN_fri * pay.friday);
    const saturdayTotal = reduceFloat(payload.IN_sat * pay.sat);
    const sundayTotal = reduceFloat(payload.IN_sun * pay.sun);
    const Total = reduceFloat(fridaysTotal + sundayTotal + weekDaysTotal + saturdayTotal);

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
    extra = (basic / 100) * extraRate
    return basic + extra
}

function createYearCalendar(rota, getMonthNumber, createMonth){
    let yearCalendar = [ ]
    const year22 = 2022;
    const year23 = 2023;
    let date = [year22];
    let OffDays = [];
    for( const prop in rota){
        let monthN = getMonthNumber(prop)

        if(monthN <= 3 ){
            date.pop();
            date.push(year23);
        }

        if(date.length === 1){
            date.unshift(monthN)
        }else if(date.length === 2){
            date.shift()
            date.unshift(getMonthNumber(prop))
        }
        OffDays = rota[prop]

        yearCalendar.push(
            createMonth({
                date,
                OffDays
            })
        )
        }

    return yearCalendar
};

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
};

function findPayDays(payDay){
    // find dates every 4 weeks, starting January 
    // find dates every 4 weeks from the specified date not necessarily in Jan
    // create list of dates for all year
    // all year is array with 12 dates. 
    // What format of the date ??? Format should be compatible with calendar made by createMonth()
    // Does findPayDays can use comparison with calendar object e.g day NO
    // findPayDays should use moment to calculate 4 weeks intervals and return array with 12 dates.

    if(payDay){
        let arr = [];
        arr.push(moment(payDay,"YYYY-MM-DD"));
        for(let i = 0; i <= 11;i++){
            arr.push(moment(arr[i], "YYYY-MM-DD").add(4,'w'));
        };
        return arr;
    }
    throw 'No Date Specified';
};

function findCutOfDays(payDays){
    let arr = [];

    if (payDays?.length >= 1) {
            payDay:element,
            cutOffDay:moment(element,'YYYY-MM-DD').subtract(8,'d')
        });
        return arr;
    }

    return arr
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
    writeToResults,
    findPayDays,
    findCutOfDays,
    getMonthNumber,
    createYearCalendar,
    reduceFloat
}