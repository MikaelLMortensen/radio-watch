let modulus = 0
let second = 0
let hour = 0
let minute = 0

let year = 2000
let month = 1
let day = 1

let timeOffset = control.millis()


sevenSegment.startSevenSegPin0()
// if (RTC_DS1307.getTime(RTC_DS1307.TimeType.YEAR) < 2020) {
//     RTC_DS1307.DateTime(2020,12,13,14,28,0)
// }
radio.setGroup(17)

radio.onReceivedValue(function (name: string, value: number) {
    switch(name) {
        case "hour":
        hour = value
        break;
        case "minute":
        minute = value
        break;
        case "second":
        second = value
        break;
        case "year":
        year = value
        break;
        case "month":
        month = value
        break;
        case "day":
        day = value
        break;
    }
    timeOffset = control.millis()
})

input.onButtonPressed(Button.A, function () {
    radio.sendString("gettime")

    // hour += 1
    // if (hour > 24) {
    //     hour = 0
    // }
    // RTC_DS1307.setTime(RTC_DS1307.TimeType.HOUR, hour)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("" + (GetTimeString()))
})

input.onButtonPressed(Button.B, function () {

    let timestamp = GetDateString() + " " + GetTimeString()

    basic.showString(timestamp)

    // minute += 1
    // if (minute > 60) {
    //     minute = 0
    // }
    // RTC_DS1307.setTime(RTC_DS1307.TimeType.MINUTE, minute)
})


function GetDateString() : string {
    let date = year.toString() +  "-"
    if (month < 10) {
        date += "0"
    }
    date += month.toString() + "-"
    if (day < 10){
        date += "0"
    }
    date += day.toString()
    
    return date
}

function GetTimeString() : string {
    // hour = RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR)
    // minute = RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE)
    // second = RTC_DS1307.getTime(RTC_DS1307.TimeType.SECOND)
    let timeText = ""
    if (hour < 10) {
        timeText = timeText + "0"
    }
    timeText = timeText + hour.toString()
    if (minute < 10) {
        timeText = timeText + "0"
    }
    timeText = timeText + minute.toString()
//    modulus = second % 5
//    if (modulus > 0) {
//        timeText = timeText.substr(0, modulus) + "." + timeText.substr(modulus, 0)
//    }
    return timeText
}

basic.forever(function () {

    // number of seconds since last update
    let seconds = Math.floor((control.millis() - timeOffset) / 1000)

    sevenSegment.writeString(GetTimeString())
    basic.pause(1000)
})
