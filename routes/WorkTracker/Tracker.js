const extractDateFromString = require('./factory').extractDateFromString;
const calcEarnedFor_Month = require('./factory').calcEarnedFor_Month;
const calcEarnedForDay = require('./factory').calcEarnedForDay;
const getNameOfWeekDay = require('./factory').getNameOfWeekDay;
const getCombinations = require('./factory').getCombinations;
const writeToResults = require('./factory').writeToResults;
const getIn_OffDays = require('./factory').getIn_OffDays;
const getMonthName = require('./factory').getMonthName;
const calcPercent = require('./factory').calcPercent;
const returnDate = require('./factory').returnDate;
const findPayDay = require('./factory').findPayDay;
const countDays = require('./factory').countDays;
const checkIN = require('./factory').checkIN;
const moment = require('moment');

const weekCombinations = require('./store').weekCombinations;

// date format month/year
function createMonth(rota){
    const {OffDays,date} = rota;
    const DateArg = returnDate(date,extractDateFromString);
    const month = moment(DateArg).month();
    const year = moment(DateArg).year();
    const monthName = getMonthName(month);
    const days = moment().daysInMonth(month);

    let calendar = {
        name: monthName,
        fixedWorkingDays:null,
        month: month + 1,
        year,
        numberOfDaysInCalMonth: days,
        OFF_Days:null,
        IN_Days:null,
        IN_weekDays: null,
        IN_fri: null,
        IN_sat: null,
        IN_sun: null,
        rates: {
            currency: 'GBP',
            basic: 16.75,
            nights: {
                percent: 25,
                rate: null,
            },
            weekends: {
                percent: 33,
                rate: null,
            },
            overtime: {
                percent: 50,
                rate: null,
            },
        },
        day_pay: {},
        basic_salary: {},
        calendar: [],
    };

    for (let i = 1; i <= days; i++) {
        let weekDay = getNameOfWeekDay(DateArg, i);
        calendar.calendar.push({
            weekDay,
            day: i,
            start:null,
            finish:null,
            in: checkIN(OffDays, i, weekDay),
            payDay:false,
            cutOffDay:false,
        });
    };

    const d = getIn_OffDays(calendar);
    calendar.OFF_Days = d.off;
    calendar.IN_Days = d.in;

    const { w, f, sa, su } = countDays(calendar);
    calendar.IN_weekDays = w;
    calendar.IN_fri = f;
    calendar.IN_sat = sa;
    calendar.IN_sun = su;

    calendar.day_pay = calcEarnedForDay(calendar.rates, calcPercent);
    calendar.basic_salary = calcEarnedFor_Month(calendar);

    //returns calendar object with calculated values
    return calendar;
}

const rota = {
    date: [09, 2022],
    OffDays: [3, 6, 7, 13, 14, 20, 21, 27, 28],
};
const rota2 = {
    date: [09, 2022],
    OffDays: ['Monday', 'Tuesday'],
};


// const calendar = createMonth(rota2);
// const calendar = getCombinations(weekCombinations, createMonth);
// writeToResults(calendar)
// console.log(calendar);
const payDays = findPayDay()

console.log(payDays);

