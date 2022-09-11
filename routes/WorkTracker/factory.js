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
}