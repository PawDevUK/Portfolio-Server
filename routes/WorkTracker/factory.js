const {weekCombinations} = require('./store/store');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

function extractDateFromString(str){
    let date = [];

    str.split(/[/" ":]/).forEach((i)=>{
        date.push(parseInt(i))
    })

    return date
}

function calcPercent(basic,extraRate){
    let extra = 0 
    if(extraRate){
        extra = (basic / 100) * extraRate
    }
    return basic + extra
}

function returnDate(dateArg, extractDateFromString, day, startTime){
    let payload = [];
    let dateElement = '';

    if(Array.isArray(dateArg)){
            dateArg.forEach((i)=>{
                if(typeof i === 'string' && dateArg.length === 1){
                    payload = extractDateFromString(dateArg[0])
                }else if (typeof i === 'string' && dateArg.length >=2 ){
                    payload.push(parseInt(i))
                }else if (typeof i === 'number'){
                    payload.push(i)
                }
            })
        }
    
    if( !moment.isMoment(dateArg) && typeof dateArg === 'string'){
        payload = extractDateFromString(dateArg)
    }
    
    if (moment.isMoment(dateArg) && startTime && day) {
            let H = startTime.substring(0, 2);
            let M = startTime.substring(3, 5);
            dateElement = moment(dateArg).date(day).hour(H).minute(M)
    }
    
    if(payload.length===2){
        dateElement = moment([payload[1], payload[0]-1]);
    }else if(payload.length === 3){
        dateElement = moment([payload[2], payload[1]-1,payload[0]])
    }else if(payload.length === 4){
        dateElement = moment([payload[2], payload[1]-1,payload[0],payload[3]])
    }else if(payload.length === 5){
        dateElement = moment([payload[2], payload[1]-1,payload[0],payload[3],payload[4]])
    }

    return dateElement
}

function getMonthName(m){
    return  moment().month(m).format('MMMM');
}

function getMonthNumber(name){
    return moment().month(name).format("M");
}

function reduceFloat(payload){
        return parseFloat(payload.toFixed(2))
}

function checkIN(arr,day,weekDay){
    let IN = null
    if(arr.length >= 5){
        IN = true;
        arr.forEach((i)=>{
            if(i===day){
                IN = false
            }
        })
    }else if(arr.length === 2){
        IN = true;
        arr.forEach((i)=>{
            if(i===weekDay){
                IN = false
            }
        })
    }
   return IN
}

function getIn_OffDays(calendar){
    let num = {
        in:0,
        off:0
    };
    calendar.calendar.forEach((obj)=>{
        if(!obj.in){
            num.off++
        }else if(obj.in){
            num.in ++
        }
    })
    return num
}

function countDays(obj){
    let counter = {
        w:0,
        f:0,
        sa:0,
        su:0
    }
    const wd = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    obj.calendar.forEach((i)=>{
        if(i.in && (i.weekDay===wd[0] || i.weekDay===wd[1] || i.weekDay===wd[2] || i.weekDay===wd[3])){
            counter.w++
        }else if(i.weekDay===wd[4] && i.in){
            counter.f++
        }else if(i.weekDay===wd[5] && i.in){
            counter.sa++
        }else if(i.weekDay===wd[6] && i.in){
            counter.su++
        }
    })

    return counter
}

function getOvertime(finish_Time){
    let finishTime = '';
    let overtimeTotal = '';
    if(finish_Time){
        finishTime = moment(finish_Time);
        overtimeTotal = checkDurationTime(startTime, finish_Time) - returnTime(startTime,9,15) /// initial 
    }
}

function getHoursFromStart( getFinishBasic, start_Time ){

    // moment methods used in this function:
    //  - a.from(b)
    //  - [before].isBefore([after]) true
    //  - [before].isSameOrBefore([after]) true
    //  - [after].isAfter([before])  true
    //  - [after].isSameOrAfter([before])  true
    //  - a.diff(b,'minutes')


    function returnTime(date,h,m){
        return moment(date).hour(h).minute(m);
    }
    
    function checkDurationTime(start_Time, finish_Time){
        return moment(start_Time).from(finish_Time)
    }

    function getDifference(a,b){
        return a.diff(b,'minutes') / 60
    }

    const startTime = moment(start_Time);
    let finishBasicTime = getFinishBasic(start_Time);

    const dayRateTime = returnTime(startTime,06,00);
    const nightRateTime = returnTime(startTime,22,00);
    const weekendRateTime = returnTime(startTime,00,00);

    const times = {
        nightHours:null,
        dayHours:null,
        weekendHours:null,
        overtime:null
    }

    function weekDay(start_Time){
        
        if ( start_Time.isSameOrAfter(returnTime(start_Time,00,00)) && start_Time.isBefore(dayRateTime) ){
            times.nightHours = dayRateTime.diff(start_Time,'minutes') / 60;
            times.dayHours = finishBasicTime.diff(dayRateTime,'minutes') / 60;
        }
        else if (start_Time.isSameOrAfter(dayRateTime) && finishBasicTime.isBefore(nightRateTime)){
            times.dayHours = finishBasicTime.diff(start_Time,'minutes') / 60;
        }
        else if (start_Time.isAfter(dayRateTime) && start_Time.isBefore(nightRateTime) && finishBasicTime.isSameOrAfter(nightRateTime) && finishBasicTime.isBefore(moment(dayRateTime).add(1,'day'))){
            times.dayHours = nightRateTime.diff(start_Time,'minutes') / 60;
            times.nightHours = finishBasicTime.diff(nightRateTime,'minutes') / 60;
        }
        else if ( start_Time.isBefore(nightRateTime) && finishBasicTime.isSameOrAfter(moment(dayRateTime).add(1,'day'))){
            let nextDayHours = 0
            times.dayHours = nightRateTime.diff(start_Time,'minutes') / 60;
            nextDayHours = finishBasicTime.diff(moment(dayRateTime).add(1,'day'),'minutes') / 60;
            times.dayHours += nextDayHours
            times.nightHours = finishBasicTime.diff(nightRateTime,'minutes') / 60 - nextDayHours;
        }
        else if(start_Time.isSameOrAfter(nightRateTime)) {
            times.nightHours = moment(dayRateTime).add(1,'day').diff(start_Time,'minutes') / 60;
            times.dayHours = finishBasicTime.diff(moment(dayRateTime).add(1,'day'),'minutes') / 60;
        }

    }
    
    function friday(start_Time){
        if ( start_Time.isSameOrAfter(returnTime(start_Time,00,00)) && start_Time.isBefore(dayRateTime) ){
            times.nightHours = dayRateTime.diff(start_Time,'minutes') / 60;
            times.dayHours = finishBasicTime.diff(dayRateTime,'minutes') / 60;
        }
        else if (start_Time.isSameOrAfter(dayRateTime) && finishBasicTime.isBefore(nightRateTime)){
            times.dayHours = finishBasicTime.diff(start_Time,'minutes') / 60;
        }
        else if (start_Time.isAfter(dayRateTime) && finishBasicTime.isSameOrAfter(nightRateTime) && finishBasicTime.isSameOrBefore(moment(weekendRateTime).add(1,'day'))){
            times.dayHours = getDifference(nightRateTime,start_Time);
            times.nightHours = getDifference(finishBasicTime,nightRateTime);
        }else if ( start_Time.isAfter(dayRateTime) && start_Time.isBefore(nightRateTime) && finishBasicTime.isAfter(moment(weekendRateTime).add(1,'day'))){
            times.dayHours = getDifference(nightRateTime,start_Time);
            times.nightHours = getDifference(moment(weekendRateTime).add(1,'day'),start_Time) - times.dayHours;
            times.weekendHours = getDifference(finishBasicTime,moment(weekendRateTime).add(1,'day'))
        }else if ( start_Time.isSameOrAfter(nightRateTime) && finishBasicTime.isAfter(moment(dayRateTime).add(1,'day'))){
            times.nightHours = getDifference(moment(weekendRateTime).add(1,'day'),start_Time);
            times.weekendHours = getDifference(finishBasicTime,moment(weekendRateTime).add(1,'day'))
        }
    }
    function saturday(start_Time){
        if(start_Time.isAfter(weekendRateTime) && start_Time.isBefore(moment(weekendRateTime).add(1,'day'))){
            times.weekendHours = getDifference(finishBasicTime, start_Time)
        }
    }
    function sunday(start_Time){
        if( start_Time.isAfter(weekendRateTime) && finishBasicTime.isSameOrBefore(moment(weekendRateTime).add(1,'day'))){
            times.weekendHours = getDifference(finishBasicTime,start_Time)
        }else if( start_Time.isAfter(weekendRateTime) && finishBasicTime.isAfter(moment(weekendRateTime).add(1,'day'))){
            times.weekendHours = getDifference(moment(weekendRateTime).add(1,'day'), start_Time);
            times.nightHours = getDifference(finishBasicTime,moment(weekendRateTime).add(1,'day'))
        }else if( start_Time.isBefore(moment(weekendRateTime).add(1,'day')) && finishBasicTime.isAfter(moment(dayRateTime).add(1,'day'))){
            times.weekendHours = getDifference(weekendRateTime, start_Time);
            times.nightHours = getDifference(finishBasicTime,moment(weekendRateTime).add(1,'day')) /// need to be finished !!!
            times.dayHours = getDifference(moment(finishBasicTime).add(1,'day'),moment(dayRateTime).add(1,'day'))
        }
    }


    if( moment(startTime).format('dddd')==='Monday' ||  moment(startTime).format('dddd')==='Tuesday' || moment(startTime).format('dddd')==='Wednesday' || moment(startTime).format('dddd')==='Thursday'){
        weekDay(startTime);
    }
    else if(moment(startTime).format('dddd')==='Friday'){
        friday(startTime);
    }
    else if(moment(startTime).format('dddd')==='Saturday'){
        saturday(startTime);
    }else if(moment(startTime).format('dddd')==='Sunday'){
        sunday(startTime);
    }

    return times
}

function getTotalEarned(obj,reduceFloat){
    let i = 0;
    Object.keys(obj).forEach((key)=> {
        if(obj[key]){
            i += obj[key]
        }
    })
    return reduceFloat(i)
}
function calculateEarned( basic, percent , time, reduceF, calc){
    // console.log(basic, percent , time, reduceF, calc);
    return reduceF(calc(basic,percent) * time )
}

//** @function 
/** @name calcEarnedForDay
*/
function calcEarnedForDay(
    rates,
    getHoursFromStart,
    getFinishBasic,
    calc,
    start_Time,
    reduceFloat,
    in_Work
    ){
        let payload = {
            times: {
                nightHours:null,
                dayHours:null,
                weekendHours:null,
                Hours:null,
            },
            earned: {
                nightEarned: null,
                dayEarned: null,
                weekendEarned: null,
                overtimeEarned: null,
                TotalEarned: null,
            },
        };

    const { basic, nights, weekends } = rates;

    if(in_Work){
        payload.times = getHoursFromStart( getFinishBasic , start_Time);
        let times = payload.times;
        payload.earned.nightEarned = payload.times.nightHours ? calculateEarned(basic, nights.percent, times.nightHours, reduceFloat, calc) : null;
        payload.earned.dayEarned = payload.times.dayHours ? calculateEarned(basic, 0 ,times.dayHours, reduceFloat, calc) : null;
        payload.earned.weekendEarned = payload.times.weekendHours ? calculateEarned(basic, weekends.percent, times.weekendHours, reduceFloat, calc) : null;
        payload.earned.overtimeEarned = payload.times.overtimeHours ? calculateEarned(basic, 0, times.overtimeHours, reduceFloat, calc) : null;
        payload.earned.TotalEarned = getTotalEarned(payload.earned,reduceFloat);
    }
        
    return payload;
}

function getEarnedFor_Month(payload, reduceFloat){

    return payload.reduce((sum, next)=>{
        return reduceFloat(sum + next.earnedFromHours.TotalEarned)
    },0)

}

function calcEarnedFor_Month_Be_Twin_PD(cal, payDays) {
    let calendar = [];

    calendar = cal.map((element, i) => {

        return {
            month:null,
            from:null,
            to:null,
            earned:null,
        }
    });

    return calendar;
}

function getNameOfWeekDay(payload,i){
    const a = moment(payload).date(i)
    return moment(a).format('dddd')
}

function getFinishBasic(start_Time){
    return moment(start_Time).add(9,'hours').add(15,'minutes')
}


function createYearCalendar(rota, getMonthNumber, createMonth){
    let yearCalendar = [ ]
    const year22 = 2022;
    const year23 = 2023;
    let date = [year22];
    let OffDays = [];
    for( const prop in rota){
        let monthN = getMonthNumber(prop)

        if(monthN <= 3 ){
            date.pop();
            date.push(year23);
        }

        if(date.length === 1){
            date.unshift(monthN)
        }else if(date.length === 2){
            date.shift()
            date.unshift(getMonthNumber(prop))
        }
        OffDays = rota[prop]

        yearCalendar.push(
            createMonth({
                date,
                OffDays
            })
        )
        }

    return yearCalendar
};

function getCombinations(weekCombinations, createMonth){
    
    let result = []

    weekCombinations.forEach((i)=>{
        const rota = {
            date:[09,2022],
            OffDays:i
        }
       result.push(createMonth(rota))
    })

    return result
};

function findPayDays(payDay){
    if(payDay){
        let arr = [];
        arr.push(moment(payDay,"YYYY-MM-DD"));
        for(let i = 0; i <= 11;i++){
            arr.push(moment(arr[i], "YYYY-MM-DD").add(4,'w'));
        };
        return arr;
    }
    throw 'No Date Specified';
};

function findCutOfDays(payDays){
    let arr = [];
    if (payDays?.length >= 1) {
        payDays.forEach((element, i) => {
            arr.push( moment(element, 'YYYY-MM-DD').subtract(8, 'd'));
        });
        return arr;
    }
    throw 'No Pay Dates selected to generate cut off dates!!!'
}

//**@function
/** @name  addPDandCOD
/ function checks dates generated by helper functions findPayDays() and findCutOfDays() and adds pay dates and
/ cut off dates to a calendar object.
*/
function addPDandCOD(payDays, date, day) {
    let Element = false // pay day or cut off day 
    let DT = moment(date).date(day) // date
    payDays.forEach((ele, i)=>{
        if(moment(DT).isSame(ele)){
            Element = true 
        }
    });
    return Element;
};

function addId(){
    return uuidv4()
};



function checkPercentageFrom(main,fraction){
    let percent;
    let stPerce;

    let mainDivided = main/100

    percent = fraction / mainDivided

    stPerce = percent.toString().slice(0,4)

    return `${fraction} is ${stPerce} of ${main}`
}

module.exports = {
    extractDateFromString,
    returnDate,
    getMonthName,
    checkIN,
    getIn_OffDays,
    countDays,
    calcEarnedForDay,
    calcEarnedFor_Month,
    getNameOfWeekDay,
    calcPercent,
    getCombinations,
    findPayDays,
    findCutOfDays,
    getMonthNumber,
    createYearCalendar,
    reduceFloat,
    addPDandCOD,
    addId,
    getFinishBasic,
    getHoursFromStart,
}