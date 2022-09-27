const extractDateFromString = require('./factory').extractDateFromString;
const calcEarnedFor_Month = require('./factory').calcEarnedFor_Month;
const createYearCalendar = require('./factory').createYearCalendar
const calcEarnedForDay = require('./factory').calcEarnedForDay;
const getNameOfWeekDay = require('./factory').getNameOfWeekDay;
const getCombinations = require('./factory').getCombinations;
const writeToResults = require('./factory').writeToResults;
const getMonthNumber = require('./factory').getMonthNumber;
const getIn_OffDays = require('./factory').getIn_OffDays;
const findCutOfDays = require('./factory').findCutOfDays;
const getMonthName = require('./factory').getMonthName;
const findPayDays = require('./factory').findPayDays;
const addPDandCOD = require('./factory').addPDandCOD
const calcPercent = require('./factory').calcPercent;
const reduceFloat = require('./factory').reduceFloat;
const returnDate = require('./factory').returnDate;
const countDays = require('./factory').countDays;
const checkIN = require('./factory').checkIN;
const moment = require('moment');

const { fullYearRota } = require('./store');

const weekCombinations = require('./store').weekCombinations;

// date format month/year
function createMonth(rota){

    const {OffDays,date} = rota;
    const DateArg = returnDate(date,extractDateFromString);
    const month = moment(DateArg).month();
    const year = moment(DateArg).year();
    const monthName = getMonthName(month);
    const days = moment().daysInMonth(month);

    const FirstPayDay = '2022-04-29';
    const payDays = findPayDays(FirstPayDay);
    const cutOffD = findCutOfDays(payDays);


    let calendar = {
        name: monthName,
        fixedWorkingDays:null, // it is used only if working rota has same days in the week e.g 'Wednesday','Saturday'
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
            payDay:addPDandCOD(payDays, DateArg, i),
            cutOffDay:addPDandCOD(cutOffD, DateArg, i),
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

    calendar.day_pay = calcEarnedForDay(calendar.rates, calcPercent, reduceFloat);
    calendar.basic_salary = calcEarnedFor_Month(calendar, reduceFloat);

    const rates = calendar.rates
    rates.nights.rate = reduceFloat(calcPercent(rates.basic, rates.nights.percent))
    rates.weekends.rate = reduceFloat(calcPercent(rates.basic, rates.weekends.percent))
    rates.overtime.rate = reduceFloat(calcPercent(rates.basic, rates.overtime.percent))

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


const yearRota = createYearCalendar(fullYearRota, getMonthNumber, createMonth)

// const payDays = findCutOfDays(findPayDays('2022-01-07'))
writeToResults(yearRota)