/**
 * function jumpOverDates
 */
export function jumpOverDates(date, diff) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + diff);
    return newDate;
}

/**
 * function getNextDate
 */
export function getNextDate(date) {
    return jumpOverDates(date, 1);
}

/**
 * function getPrevDate
 */
export function getPrevDate(date) {
    return jumpOverDates(date, -1);
}

/**
 * function getNextMonth
 */
export function getNextMonth(date) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
}

/**
 * function getPrevMonth
 */
export function getPrevMonth(date) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
}

/**
 * function getWeek
 */
export function getWeek(locale = 'default', startDate = getMondayOfCurrentWeek(), count = 7) {
    if (count < 1) {
        return [];
    }
    if (count === 1) {
        return [{
            number: startDate.getDay(),
            shortText: startDate.toLocaleString(locale, { weekday: 'short' }),
        }];
    }
    return [
        ...getWeek(locale, startDate, 1),
        ...getWeek(locale, getNextDate(startDate), count - 1)
    ];
}

/**
 * function getMondayOfCurrentWeek
 */
export function getMondayOfCurrentWeek() {
    const date = new Date();
    const day = date.getDay();

    switch (day) {
        case 0:
            return getNextDate(date);
        case 1:
            return date;
        default:
            return jumpOverDates(date, -(day - 1));
    }
}