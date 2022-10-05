const {calcPercent, extractDateFromString} = require('../../../routes/WorkTracker/factory.js');
const moment =require('moment')
describe(
    "Test for the method to extract integer from the string. Order of the returned integers doesn't matter at the moment.", ()=>{

        test('Should return array with numbers', () => {
            expect(extractDateFromString('12/2022')).toEqual([12, 2022]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('01/2002')).toEqual([01, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('01/2002')).toEqual([1, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('1/2002')).toEqual([1, 2002]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('2002/2')).toEqual([2002, 2]);
        });
        test('Should return array with numbers', () => {
            expect(extractDateFromString('2002/2/3')).toEqual([2002, 2, 3]);
        });
    }
);

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
