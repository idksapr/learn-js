/**
 * EventEmitter
  */
class EventEmitter {
    constructor() {
        this._eventListeners = {};
    }

    subscribe(eventName, callback) {
        if (!this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [];
        }
        this._eventListeners[eventName].push(callback);

        return () => {
            this._eventListeners[eventName] = this._eventListeners[eventName].filter(fn => fn !== callback);
        }
    }

    emit(eventName, ...args)  {
        if (this._eventListeners[eventName]) {
            for (let listener of this._eventListeners[eventName]) {
                listener.call(null, ...args);
            }
        }
    }
}

export default EventEmitter;