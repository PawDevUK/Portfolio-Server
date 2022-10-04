const {weekCombinations} = require('./store');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const fs = require('fs');

function extractDateFromString(str){
    let date = [];

    str.split('/').forEach((i)=>{
        date.push(parseInt(i))
    })

    return date
}

function returnDate(dateArg, extractDateFromString, day, startTime){
    let payload = [];
    let dateElement = '';

    if(Array.isArray(dateArg)){
        dateArg.forEach((i)=>{
            if(typeof i === 'string' && dateArg.length === 1){
                payload = extractDateFromString(dateArg[0])
            }else if (typeof i === 'string' && dateArg.length >=2 ){
                payload.push(parseInt(i))
            }else if (typeof i === 'number'){
                payload.push(i)
            }
        })
        if(payload.length===2){
            dateElement = moment([payload[1], payload[0]-1]);
        }else if(payload.length === 3){
            dateElement = moment([payload[2], payload[1]-1,payload[0]])
        }else if(payload.length === 4){
            dateElement = moment([payload[2], payload[1]-1,payload[0],payload[3]])
        }else if(payload.length === 5){
            dateElement = moment([payload[2], payload[1]-1,payload[0],payload[3],payload[4]])
        }
    }
    
    if (!Array.isArray(dateArg) && startTime && day) {
            let H = startTime.substring(0, 2);
            let M = startTime.substring(3, 5);
            dateElement = moment(dateArg).date(day).hour(H).minute(M)
    }

    return dateElement
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
/** @name calcEarnedForDay at the moment this function calculate earnings for day only between 17:00 and 02:15
*/
function calcEarnedForDay(rates,calc,reduceFloat,start_Time){

    // calculate from start to plus 9.25h
    // create break points for different rates
    //  week day monday-friday 06:00 - 22:00

    //  week night monday 00:00 - 06:00
    //  week night tuesday-thursday 22:00 - 06:00
    //  week night friday 22:00 - 00:00

    //  weekend night sat 00:00 - 06:00
    //  weekend day sat-sun 06:00 - 22:00
    //  weekend night sat 22:00 - 06:00
    //  weekend night sun 22:00 - 00:00

    const { basic, nights, weekends } = rates;

    let payload = {};
    
    function weekDay(){
        const dayH = 5 * basic; //from 17:00 till 22:00 is 5h 
        const nightH = 4.25 * calc(basic,nights.percent); // from 22:00 till finish 02:15 is 4h 15min
        return dayH + nightH;
    }
    function friday(){
        const dayH = 5 * basic; //from 17:00 till 22:00 is 5h 
        const nightH = 2 * calc(basic,nights.percent); 
        const weekendH = 2.25 * calc(basic,weekends.percent);
        return dayH + nightH + weekendH;
    }
    function sat(){
        return 9.25 * calc(basic,weekends.percent);
    }
    function sun(){
        const weekendH = 7 * calc(basic,weekends.percent);
        const nightH = 2.25 * calc(basic,nights.percent); // week night from 00:00
        return weekendH + nightH;
    }

    payload['weekDay'] = reduceFloat(weekDay());
    payload['friday'] = reduceFloat(friday());
    payload['sat'] = reduceFloat(sat());
    payload['sun'] = reduceFloat(sun());

    return payload;
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

function calcEarnedFor_Month_Be_Twin_PD(cal, payDays) {
    let calendar = [];

    calendar = cal.map((element, i) => {

        return {
            month:null,
            from:null,
            to:null,
            earned:null,
        }
    });

    return calendar;
}

function getNameOfWeekDay(payload,i){
    const a = moment(payload).date(i)
    return moment(a).format('dddd')
}

function getFinishBasic(start_Time){
    return moment(start_Time).add(9,'hours').add(15,'minutes').format('HH:mm').toString()
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
        payDays.forEach((element, i) => {
            arr.push( moment(element, 'YYYY-MM-DD').subtract(8, 'd'));
        });
        return arr;
    }
    throw 'No Pay Dates selected to generate cut off dates!!!'
}
//**@function
/** @name  addPDandCOD
/ function checks dates generated by helper functions findPayDays() and findCutOfDays() and adds pay dates and
/ cut off dates to a calendar object.
*/
function addPDandCOD(payDays, date, day) {
    let Element = false // pay day or cut off day 
    let DT = moment(date).date(day) // date
    
    // function should loop over calendar object and if date is in payDates objects change payDay for the day to true
    // function should loop over calendar object and if date is in cutOffD objects change cutOffDay for the day to true
    payDays.forEach((ele, i)=>{
        if(moment(DT).isSame(ele)){
            Element = true 
        }
    });

    return Element;
};

function addId(){
    return uuidv4()
};

//** @function 
/** @name writeToResults
/function whites for better readability in development, full combination of days to 'result.js'
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
function checkPercentageFrom(main,fraction){
    let percent;
    let stPerce;

    let mainDivided = main/100

    percent = fraction / mainDivided

    stPerce = percent.toString().slice(0,4)

    return `${fraction} is ${stPerce} of ${main}`
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
    reduceFloat,
    addPDandCOD,
    addId,
    getFinishBasic,
}