function extractDateFromString(str){
    let date=[];
    date.push(parseInt(str.slice(0,2)))
    date.push(parseInt(str.slice(3,str.length)))

    return date
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