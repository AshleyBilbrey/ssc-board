const quarterEnd = new Date(2024, 5, 6, 23, 59, 0, 0)
const quarterStart = new Date(2024, 3, 1, 0, 0, 0, 0)
const holidays = [
    {year: 2024, month: 0, day: 15}
]
const weeklyHours = [
    {open: false},
    {open: true, openTime: {hour: 13, min: 30}, closeTime: {hour: 19, min: 0}},
    {open: true, openTime: {hour: 12, min: 0}, closeTime: {hour: 19, min: 0}},
    {open: true, openTime: {hour: 12, min: 0}, closeTime: {hour: 19, min: 0}},
    {open: true, openTime: {hour: 12, min: 0}, closeTime: {hour: 19, min: 0}},
    {open: true, openTime: {hour: 12, min: 0}, closeTime: {hour: 17, min: 0}},
    {open: false}
]

/**
 * Checks if the center is currently open.
 */
function checkOpen() {
    console.log("Running")
    let now = new Date()
    if(inQuarter(now) && !inHoliday(now) && inDailyHours(now)) {
        setOpen()
    } else {
        setClosed()
    }
}

/**
 * Returns true if the date is within the current quarter.
 * @param {Date} date 
 * @returns {boolean}
 */
function inQuarter(date) {
    if(date > quarterStart && date < quarterEnd) return true;
    return false;
}

/**
 * Returns true if the date is a holiday.
 * @param {Date} now 
 * @returns {boolean}
 */
function inHoliday(date) {
    for(const holiday of holidays) {
        if(date.getFullYear() == holiday.year && date.getMonth() == holiday.month && date.getDate() == holiday.day) {
            return true;
        }
    }
    return false;
}

/**
 * Checks the weekly array to see if we're within today's open hours.
 * @param {Date} date 
 * @returns {boolean}
 */
function inDailyHours(date) {
    const dailyHours = weeklyHours[date.getDay()]
    if(dailyHours.open == false) return false;
    const todayOpen = new Date(date.getFullYear(), date.getMonth(), date.getDate(), dailyHours.openTime.hour, dailyHours.openTime.min)
    const todayClose = new Date(date.getFullYear(), date.getMonth(), date.getDate(), dailyHours.closeTime.hour, dailyHours.closeTime.min)
    if(date > todayOpen && date < todayClose) return true;
    return false;
}

/**
 * Sets the display to open.
 */
function setOpen() {
    let footer = document.getElementById("footer")
    footer.classList.remove("closed")
    footer.classList.add("open")
    footer.innerText = "<-- Open, come on in!"
}


/**
 * Sets the display to closed.
 */
function setClosed() {
    let footer = document.getElementById("footer")
    footer.classList.remove("open")
    footer.classList.add("closed")
    footer.innerText = "Closed"
}

window.onload = () => {
    checkOpen()
    setInterval(() => {
        checkOpen()
    }, 15000);    
}