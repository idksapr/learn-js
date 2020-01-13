import EventEmitter from "../EventEmitter.js";

/**
 * class Component
 */
class Component extends EventEmitter {
    constructor(props = {}) {
        super();
        this._props = props;
    }

    make() {
        this.clear();
        this._container = createContainer(this.render());
        this.registerEventListeners();
        return this._container;
    }

    clear() {
        if (this._container) {
            this._container.remove();
        }
    }

    registerEventListeners() {}

    render() {
        return '';
    }
}

export function createContainer(html) {
    const outerContainer = document.createElement('div');
    outerContainer.insertAdjacentHTML('afterbegin', html);
    const container = outerContainer.firstElementChild.cloneNode(true);
    outerContainer.remove();
    return container;
}

export default Component;