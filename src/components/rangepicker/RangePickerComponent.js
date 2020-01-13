import Component, { createContainer } from "../Component.js";
import MonthCalendar from "./MonthCalendar.js";
import { getNextMonth, getPrevMonth, getWeek, jumpOverDates } from "../../utils/dateUtils.js";

/**
 * class RangePicker
 */
class RangePickerComponent extends Component {
    constructor(props) {
        super(props);

        this.onGoLeft = this.onGoLeft.bind(this);
        this.onDisplayToggle = this.onDisplayToggle.bind(this);
        this.onGoRight = this.onGoRight.bind(this);
        this.onClickDate = this.onClickDate.bind(this);
        this.onChangeDateInterval = this.onChangeDateInterval.bind(this);

        this.initDatesInterval();
        this.clicksCount = 0
    }

    initDatesInterval() {
        const from = this._props.from ? new Date(this._props.from) : new Date();
        const to = this._props.to ? new Date(this._props.to) : new Date(jumpOverDates(this.from, 4));

        this.from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
        this.to = new Date(to.getFullYear(), to.getMonth(), to.getDate());

        this.adjustInterval();
    }

    render() {
        return `
            <div class="rangepicker rangepicker_open">
              <div class="rangepicker__input" data-elem="input">
                <span data-elem="from">${this.from.toLocaleDateString()}</span> -
                <span data-elem="to">${this.to.toLocaleDateString()}</span>
              </div>
              <div class="rangepicker__selector" data-elem="selector" style="display:none">
                <div class="rangepicker__selector-arrow"></div>
                <div class="rangepicker__selector-control-left"></div>
                <div class="rangepicker__selector-control-right"></div>
                ${this.renderCalendar(this.from.getFullYear(), this.from.getMonth())}
                ${this.renderCalendar(getNextMonth(this.from).getFullYear(), getNextMonth(this.from).getMonth())}
              </div>
            </div>
        `;
    }

    renderCalendar(year, month) {
        const { locale } = this._props;
        const dates = new MonthCalendar(year, month);
        const daysOfWeek = getWeek(locale);

        const title = dates.firstDate
            .toLocaleString(this._props.locale, {month: 'long', year: 'numeric'});

        const getDayNumberOfWeek = date =>
            daysOfWeek.findIndex(day => day.number === date.getDay());

        let emptyCellsBeforeDatesCount = range(1, getDayNumberOfWeek(dates.firstDate));
        let emptyCellsAfterDatesCount = range(1, 6 - getDayNumberOfWeek(dates.lastDate));

        return ` 
            <div class="rangepicker__calendar" data-year="${year}" data-month="${month}"> 
              <div class="rangepicker__month-indicator"> 
                <time datetime="${title}">${title}</time>
              </div>
              <div class="rangepicker__day-of-week">
                ${daysOfWeek.reduce((carry, day) => carry + `<div>${day.shortText}</div>`, '')}
              </div>
              <div class="rangepicker__date-grid">
                ${emptyCellsBeforeDatesCount.reduce((carry, n) => carry + '<div></div>', '')}
                ${[...dates].reduce((carry, date) => {
                    const classes = ['rangepicker__cell'];

                    if (date.getTime() === this.from.getTime()) {
                        classes.push('rangepicker__selected-from');
                    } else if (date.getTime() === this.to.getTime()) {
                        classes.push('rangepicker__selected-to');
                    } else if (date > this.from && date < this.to) {
                        classes.push('rangepicker__selected-between');
                    }
                    
                    return carry + `
                        <button type="button" class="${classes.join(' ')}" data-value="${date}">
                          ${date.getDate()}
                         </button>
                    `;
                }, '')}
                ${emptyCellsAfterDatesCount.reduce((carry, n) => carry + '<div></div>', '')}
              </div>
            </div>`;
    }

    registerEventListeners() {
        for (let dateGrid of this._container.querySelectorAll('.rangepicker__date-grid > .rangepicker__cell')) {
            dateGrid.addEventListener('pointerdown', this.onClickDate);
        }

        this._container
            .querySelector('.rangepicker__input')
            .addEventListener('pointerdown', this.onDisplayToggle)

        this._container
            .querySelector('.rangepicker__selector-control-left')
            .addEventListener('pointerdown', this.onGoLeft);

        this._container
            .querySelector('.rangepicker__selector-control-right')
            .addEventListener('pointerdown', this.onGoRight);

        this._container
            .querySelector('.rangepicker__selector')
            .addEventListener('date-interval-change', this.onChangeDateInterval);
    }

    onClickDate(event) {
        const dateValue = event.target.dataset.value;
        this.clicksCount++;

        if (this.clicksCount < 2) {
            this.removeCellSelection();
            this.from = new Date(dateValue);
            event.target.classList.add('rangepicker__selected-from');
        } else {
            this.clicksCount = 0;
            this.to = new Date(dateValue);
            event.target.classList.add('rangepicker__selected-to');

            this._container
                .querySelector('.rangepicker__selector')
                .dispatchEvent(new CustomEvent('date-interval-change'));
        }
    }

    onChangeDateInterval() {
        this.adjustInterval();

        for (let cell of this._container.querySelectorAll('.rangepicker__date-grid > .rangepicker__cell')) {
            const date = new Date(cell.dataset.value);

            if (date > this.from && date < this.to) {
                cell.classList.add('rangepicker__selected-between');
            }
        }
        this._container
            .querySelector('.rangepicker__input span[data-elem="from"]')
            .textContent = this.from.toLocaleDateString();
        this._container
            .querySelector('.rangepicker__input span[data-elem="to"]')
            .textContent = this.to.toLocaleDateString();

        this.onDisplayToggle();
        this.emit('rangepicker:date-interval-change', this.from, this.to);
    }

    onDisplayToggle() {
        const elem = this._container.querySelector('.rangepicker__selector');
        elem.style.display = elem.style.display === 'none' ? '' : 'none';
    }

    onGoRight() {
        const [leftCalendar, rightCalendar] = this._container.querySelectorAll('.rangepicker__calendar');
        const date = getNextMonth(new Date(+rightCalendar.dataset.year,  +rightCalendar.dataset.month));
        leftCalendar.remove();
        rightCalendar.after(this.makeCalendar(date.getFullYear(), date.getMonth()));
    }

    onGoLeft() {
        const [leftCalendar, rightCalendar] = this._container.querySelectorAll('.rangepicker__calendar');
        const date = getPrevMonth(new Date(+leftCalendar.dataset.year,  +leftCalendar.dataset.month));
        rightCalendar.remove();
        leftCalendar.before(this.makeCalendar(date.getFullYear(), date.getMonth()));
    }

    makeCalendar(year, month) {
        const calendar = createContainer(this.renderCalendar(year, month, this._props.locale));

        calendar
            .querySelector('.rangepicker__date-grid')
            .addEventListener('pointerdown', this.onClickDate);

        return calendar;
    }

    removeCellSelection() {
        for (let cell of this._container.querySelectorAll('.rangepicker__date-grid > .rangepicker__selected-between')) {
            cell.classList.remove('rangepicker__selected-between');
        }

        const fromCell = this._container.querySelector('.rangepicker__selected-from');
        const toCell = this._container.querySelector('.rangepicker__selected-to');

        if (fromCell) {
            fromCell.classList.remove('rangepicker__selected-from');
        }
        if (toCell) {
            toCell.classList.remove('rangepicker__selected-to');
        }
    }

    adjustInterval() {
        if (this.from > this.to) {
            [ this.from, this.to ] = [ this.to, this.from ];
        }
    }
}

const range = (start, end) => start >= end ? [start] : [start, ...range(start + 1, end)];

export default RangePickerComponent;