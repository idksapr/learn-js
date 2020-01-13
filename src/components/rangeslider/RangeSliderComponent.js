import Component from "../Component";

/**
 * class RangeSliderComponent
 */
class RangeSliderComponent extends Component {
    constructor(props) {
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onChangeInterval = this.onChangeInterval.bind(this);

        const { min, max, from, to, precision } = this._props;

        this.min = min || 0;
        this.max = max || 100;
        this.precision = precision || 0;
        this.interval = [ from || this.min, to || this.max ];
    }

    render() {
        return `
            <div class="range-slider">
              <div class="range-slider__left-indicator">${this.interval[0]}</div>
              <div class="range-slider__scale">
                <div class="range-slider__left-thumb"></div>
                <div class="range-slider__right-thumb"></div>
               </div>
               <div class="range-slider__right-indicator">${this.interval[1]}</div>
            </div>
        `;
    }

    registerEventListeners() {
        this.updateThumbPositions();

        for (let thumb of this._container.querySelectorAll('.range-slider__left-thumb, .range-slider__right-thumb')) {
            thumb.addEventListener('mousedown', this.onMouseDown);
            thumb.addEventListener('dragstart', this.onDragStart);
        }

        this.subscribe('range-slider:change-interval', this.onChangeInterval);
    }

    onMouseDown(event) {
        event.preventDefault();

        const thumb = event.target;
        const scale = this.getScale();
        const thumbWidthInPercent = thumb.offsetWidth * 100 / scale.offsetWidth;
        const shiftX = event.clientX - thumb.getBoundingClientRect().left;

        const onMouseMove = event => {
            const newLeft = event.clientX - shiftX - scale.getBoundingClientRect().left;

            if (this.isLeftThumb(thumb)) {
                this.interval[0] = Math.max(
                    Math.min(
                        newLeft * 100 / scale.offsetWidth,
                        this.interval[1] - thumbWidthInPercent
                    ),
                    0
                );
            } else {
                this.interval[1] = Math.min(
                    Math.max(
                        newLeft * 100 / scale.offsetWidth,
                        this.interval[0] + thumbWidthInPercent
                    ),
                    100 - thumbWidthInPercent
                );
            }

            this.emit('range-slider:change-interval', this.regulateInterval(this.interval));
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    onChangeInterval(interval) {
        this.updateThumbPositions();
        this.updateIndicators(interval);
    }

    onDragStart() {
        return false;
    }

    getScale() {
        return this._container.querySelector(`.range-slider__scale`);
    }

    getThumb(type) {
        return this._container.querySelector(`.range-slider__${type}-thumb`);
    }

    getIndicator(type) {
        return this._container.querySelector(`.range-slider__${type}-indicator`);
    }

    isLeftThumb(thumb) {
        return thumb.classList.contains('range-slider__left-thumb');
    }

    updateThumbPositions() {
        const [ left, right ] = this.interval;

        this.getThumb('left').style.left = 100 * (left - this.min) / (this.max - this.min) + '%';
        this.getThumb('right').style.left = 100 * (right - this.min) / (this.max - this.min) + '%';
    }

    updateIndicators(interval) {
        [ this.getIndicator('left').textContent, this.getIndicator('right').textContent ] = interval;
    }

    regulateInterval() {
        return this.interval.map(boundary => this.regulateBoundary(boundary));
    }

    regulateBoundary(boundary) {
        return round(boundary * (this.max - this.min) / 100 + this.min, this.precision);
    }
}

const round = (value, precision) => {
    const correction = Math.pow(10, precision);
    return Math.round(value * correction) / correction;
};

export default RangeSliderComponent;