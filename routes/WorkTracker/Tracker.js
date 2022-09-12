const extractDateFromString = require('./factory').extractDateFromString
const calcEarnedFor_Month = require('./factory').calcEarnedFor_Month
const calcEarnedForDay = require('./factory').calcEarnedForDay
const getNameOfWeekDay = require('./factory').getNameOfWeekDay
const getMonthName = require('./factory').getMonthName
const calcPercent = require('./factory').calcPercent
const returnDate = require('./factory').returnDate
const getOffDays = require('./factory').getOffDays
const countDays = require('./factory').countDays
const checkIN = require('./factory').checkIN
const moment = require('moment')

// date format month/year
function createMonth(rota){
    const {OffDays,date} = rota;
    const DateArg = returnDate(date,extractDateFromString);
    const month = moment(DateArg).month();
    const year = moment(DateArg).year();
    const monthName = getMonthName(month);
    const days = moment().daysInMonth(month);
    const OFF_Days = getOffDays(OffDays);
    const IN_Days = days - OFF_Days ;

    let calendar = { 
        name:monthName,
        month:month+1,
        year,
        numberOfDaysInCalMonth:days,
        OFF_Days,
        IN_Days,
        IN_weekDays:null,
        IN_fri:null,
        IN_sat:null,
        IN_sun:null,
        rates:{
                currency :'GBP',
                basic:16.75,
                nights:{
                    percent:25,
                    rate:null
                },
                weekends:{
                    percent:33,
                    rate:null
                },
                overtime:{
                    percent:50,
                    rate:null
                }
            },
        pay_for_day:{},
        basic_salary:{},
        calendar:[]
    };
    
    for( let i = 1 ; i <= days; i++){
        calendar.calendar.push({
            day:i,
            in:checkIN(OffDays, i),
            weekDay:getNameOfWeekDay(DateArg,i),
        })
    }

    const {w,f,sa,su} = countDays(calendar)
    calendar.IN_weekDays = w
    calendar.IN_fri = f
    calendar.IN_sat = sa
    calendar.IN_sun = su

    calendar.pay_for_day = calcEarnedForDay(calendar.rates,calcPercent)
    calendar.basic_salary = calcEarnedFor_Month(calendar)
    
    //returns calendar object with calculated values
    return calendar
}

const rota = {
    date:[09,2022],
    OffDays:[3,6,7,13,14,20,21,27,28]
}

const calendar = createMonth(rota)
console.log(calendar);