const calcPercent = require('../../../routes/WorkTracker/factory.js').calcPercent

test('Should return 1.5', () => { expect(calcPercent(1,50)).toBe(1.5)})
test('Should return 12.5', () => { expect(calcPercent(10,25)).toBe(12.5)})
test('Should return 20', () => { expect(calcPercent(10,100)).toBe(20)})
test('Should return 1.01', () => { expect(calcPercent(1,1)).toBe(1.01)})