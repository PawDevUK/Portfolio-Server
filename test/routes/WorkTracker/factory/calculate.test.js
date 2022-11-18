const path = '../../../../routes/WorkTracker/factory/'
const {calcPercent, getHoursFromStart, getDuration, getFinishBasic, calcEarnedForDay, reduceFloat} = require(`${path}calculate`);

const moment = require('moment')

describe('Test of the function calcEarnedForDay. It should return object with hours and earnings calculated from the hours.', ()=>{
    const rates = {
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
    };
    (()=>{
        let key = 'times'
        let startTime = moment([2022,09,16,22,30])
        return test(`It should have key '${key}'`, ()=>{
            expect(calcEarnedForDay(
                rates,
                getHoursFromStart,
                getDuration,
                getFinishBasic,
                calcPercent,
                startTime,
                reduceFloat)).toHaveProperty('times')
        })
    })();

    (()=>{
        let key = 'earned'
        let startTime = moment([2022,09,16,22,30])
        return test(`It should have key '${key}'`, ()=>{
            expect(calcEarnedForDay(
                rates,
                getHoursFromStart,
                getDuration,
                getFinishBasic,
                calcPercent,
                startTime,
                reduceFloat)).toHaveProperty('times')
        })
    })()
})

describe('Checks if function reduces float from the number and also value in the object.', ()=>{
    test('Returns integer from float', ()=>{
        expect(reduceFloat(2.112121212)).toBe(2.11)
    });
})

test('Should return 1.5', () => {
    expect(calcPercent(1, 50)).toBe(1.5);
});
test('Should return 12.5', () => {
    expect(calcPercent(10, 25)).toBe(12.5);
});
test('Should return 20', () => {
    expect(calcPercent(10, 100)).toBe(20);
});
test('Should return 1.01', () => {
    expect(calcPercent(1, 1)).toBe(1.01);
});
