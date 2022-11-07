const router = require('express').Router()
const User = require('./models/user.model.js')
const mongoose = require('mongoose');

const { 
    extractDateFromString,
    createYearCalendar,
    getNameOfWeekDay,
    getCombinations,
    getMonthNumber,
    getMonthName,
    addPDandCOD,
    findPayDays,
    returnDate,
    checkIN,
    addId,
} = require('./factory/createCalendar'); // initializing calendar obj

const {
    getEarnedFor_Month,
    getHoursFromStart,
    calcEarnedForDay,
    getFinishBasic,
    getIn_OffDays,
    findCutOfDays,
    reduceFloat,
    calcPercent,
    countDays,
    calcPayDay
} = require('./factory/calculate.js'); // calculate earnings

const {writeToResults,writeFullYear} = require('./factory/development'); // development

const { fullYearRota, baseOldRate, baseNewRate, weekCombinations } = require('./store/store.js');
const FY = require('./store/fullYearCalendar.json')
const moment = require('moment')

// date format month/year
function createMonth(rota, base_rate, start_Time){

    const {OffDays,date} = rota;
    const DateArg = returnDate(date,extractDateFromString);
    const month = DateArg.month();
    const year = DateArg.year();
    const monthName = getMonthName(month);
    const days = DateArg.daysInMonth();

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
            basic: base_rate,
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
        let  date = returnDate(DateArg, extractDateFromString, i, start_Time);
        let inWork = checkIN(OffDays, i, weekDay);
        let timesEarned = calcEarnedForDay( 
            calendar.rates,
            getHoursFromStart,
            getFinishBasic,
            calcPercent,
            date,
            reduceFloat,
            inWork
             );
        calendar.calendar.push({
                weekDay,
                day: i,
                start: inWork ? moment(date).format('HH:mm'):null,
                finishBasic: inWork ? getFinishBasic(date).format('HH:mm'):null,
                finishOvertime:null,
                hours: timesEarned.times,
                earnedFromHours: timesEarned.earned,
                inWork,
                payDay:addPDandCOD(payDays, DateArg, i),
                cutOffDay:addPDandCOD(cutOffD, DateArg, i),
                id:addId(),
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

    // calendar.day_pay = calcEarnedForDay(calendar.rates, calcPercent, reduceFloat, start_Time);
    // calendar.basic_salary = calcEarnedFor_Month(calendar, reduceFloat);

    const rates = calendar.rates;
    rates.nights.rate = reduceFloat(calcPercent(rates.basic, rates.nights.percent));
    rates.weekends.rate = reduceFloat(calcPercent(rates.basic, rates.weekends.percent));
    rates.overtime.rate = reduceFloat(calcPercent(rates.basic, rates.overtime.percent));

    //returns calendar object with calculated values
    return calendar;
}

// Scenario 1
// check if user exist in the db.
// if user exist in the DB, login the user and return all saved in the DB data e.g calendar obj.
// if user not exist in the DB, add the user with empty calendar.
// if user not exist in the DB but sends all calendar required data, create user in the DB with full year rota.
//Scenario 2
// if user exist and has not calendar, create calendar from the credentials sent by user.
// if user exist and has calendar, return user calendar.


router.route('/login').post((req,res)=>{
    const user = req.user;
    const password = req.password;
    const email = req.email;

    res.send('user logged!!!')
})

router.route('/').post((req,res)=>{

    // mongoose get request to check if user exist in the DB 
    // if user exist and 


    const rota = req.rota;
    const baseRate = req.baseRate;
    const startTime = req.startTime;
    const userCalendar = createYearCalendar(rota,getMonthNumber,createMonth,calcPayDay,baseRate,startTime)
    res.send(userCalendar)
})

// const yearRota = createYearCalendar(fullYearRota, getMonthNumber, createMonth, baseNewRate, startTime)

// writeFullYear(yearRota, startTime)

// const month = createMonth(rota, baseNewRate, startTime)

// writeToResults(month)


let year = calcPayDay(FY)

writeToResults(year)