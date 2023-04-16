const baseOldRate = 14.98
const baseNewRate = 16.75

const rates = {
    base:16.75,
    night:25,
    weekend:30,
    overtime:50
}

const Rota22_23 = {
    April: [null],
    May: [1,4,10,11,15,21,22,23,29,30],
    Jun: [5,11,12,18,19,25,28,29],
    July: [5,6,12,13,19,20,24,30,31],
    August: [1,7,8,14,20,21,27,28],
    September:[3,6,7,13,14,20,21,27,28],
    October: [2,8,9,10,16,17,23,29,30],
    November:[5,6,12,15,16,22,23,29,30],
    December:[6,7,11,17,18,19,25,26],
    January: [1,7,8,14,15,21,24,25,31],
    February:[1,7,8,14,15,19,25,26,27],
    March:[5,6,12,18,19,25,26,],
};

const weekCombinations = [
    ['Monday','Tuesday'],
    ['Monday','Wednesday'],
    ['Monday','Thursday'],
    ['Monday','Fridays'],
    ['Monday','Saturday'],
    ['Monday','Sunday'],
    ['Tuesday','Wednesday'],
    ['Tuesday','Thursday'],
    ['Tuesday','Friday'],
    ['Tuesday','Saturday'],
    ['Tuesday','Sunday'],
    ['Wednesday','Thursday'],
    ['Wednesday','Friday'],
    ['Wednesday','Saturday'],
    ['Wednesday','Sunday'],
    ['Thursday','Friday'],
    ['Thursday','Saturday'],
    ['Thursday','Sunday'],
    ['Friday','Saturday'],
    ['Friday','Sunday'],
    ['Saturday','Sunday'],
]

module.exports = {
    weekCombinations,
    fullYearRota,
    baseOldRate,
    baseNewRate,
    rates
}