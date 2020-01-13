import {getNextDate, getNextMonth, getPrevDate} from "../../utils/dateUtils.js";

/**
 * class MonthCalendar
 */
class MonthCalendar {
    constructor(year, month, date = 1) {
        this._first = new Date(year, month, date);
        this._current = new Date(this._first);
        this._last = new Date(this._first);
    }

    get firstDate() {
        return this._first;
    }

    get lastDate() {
        return getPrevDate(getNextMonth(this._first));
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this._current.getMonth() === this._first.getMonth()) {
            this._last = new Date(this._current);
            this._current = getNextDate(this._current);
            return { done: false, value: this._last };
        }
        return { done: true };
    }
}

export default MonthCalendar;