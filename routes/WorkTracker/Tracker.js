
const rates = {
    currency : 'GBP',
    basic : 14.98,
    nights :25,
    weekends: 33,
    overtime: 50
}


function calcPercent(basic,extraRate){
    let extra = 0 
    extra = basic / 100 * extraRate
    return basic + extra
}

const evening = calcPercent(
    rates.basic,
    rates.evening
    )

console.log('Evening rate £'+ evening)
console.log('Evening rate £'+ evening)


console.log(
    {
        currency : 'gbp',
        basic : 14.98,
        nights :calcPercent(rates.basic,rates.nights),
        weekends: calcPercent(rates.basic,rates.weekends),
        overtime: calcPercent(rates.basic,rates.overtime)
    }
)

function checkPercentageFrom(main,fraction){
    let percent;
    let stPerce;

    let mainDivided = main/100

    percent = fraction / mainDivided

    stPerce = percent.toString().slice(0,4)

    return `${fraction} is ${stPerce} of ${main}`
}

let retirementPay = checkPercentageFrom(3394,141)

function checkWeekDay(year,month,day){
    let date = new Date(year,month,day)
    let weekDay = date.toLocaleDateString('en-US', {
        weekday: 'long',
      })

    return weekDay
}
function extractDateFromString(str){
    let date=[];
    date.push(parseInt(str.slice(0,2)))
    date.push(parseInt(str.slice(3,str.length)))

    return date
}
// date format month/year
function createMonth(date){
    let intDate = extractDateFromString(date)
    let passedDate = new Date(intDate[1],intDate[0],0)
    let days = passedDate.getDate()
    let monthName = passedDate.toLocaleString('default',{month:'long'})
    let calendar = [monthName];
    console.log(days)

    for( let i = 1 ; i <= days; i++){
        calendar.push({
            day:i,
            weekDay:checkWeekDay(intDate[1],intDate[0],i)
        })
    }
    
    return calendar
}

console.log(createMonth('06/2022'))

