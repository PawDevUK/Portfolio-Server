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


let retirementPay = checkPercentageFrom(3394,141)