const moment = require('moment')

function extractDateFromString(str){
    let date=[];
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
    return  moment().month(m).format('MMMM')
}

function checkIN(arr,day){
    let IN = null
    if(arr.length > 1){
        IN = true;
        arr.forEach((i)=>{
            if(i===day){
                IN = false
            }
        })
    }
   return IN
}

function getOffDays(arr){
    return arr.length
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

    payload['weekDay'] = weekDay()
    payload['friday'] = friday()
    payload['sat'] = sat()
    payload['sun'] = sun()

    return payload
}

function calcEarnedFor_Month(payload){
    const pay = payload.pay_for_day
    const weekDaysTotal = payload.IN_weekDays * pay.weekDay
    const fridaysTotal = payload.IN_fri * pay.friday
    const saturdayTotal = payload.IN_sat * pay.sat
    const sundayTotal = payload.IN_sun * pay.sun
    const Total = weekDaysTotal + fridaysTotal + saturdayTotal + sundayTotal

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

module.exports = {
    extractDateFromString,
    returnDate,
    getMonthName,
    checkIN,
    getOffDays,
    countDays,
    calcEarnedForDay,
    calcEarnedFor_Month,
    getNameOfWeekDay,
    calcPercent,
}