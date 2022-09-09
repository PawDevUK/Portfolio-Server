function checkPercentageFrom(main,fraction){
    let percent;
    let stPerce;

    let mainDivided = main/100

    percent = fraction / mainDivided

    stPerce = percent.toString().slice(0,4)

    return `${fraction} is ${stPerce} of ${main}`
}


let retirementPay = checkPercentageFrom(3394,141)