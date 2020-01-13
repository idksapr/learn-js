/**
 * class Notification
 */
class Notification {
    constructor(parentContainer, message, type = 'info') {
        this.parentContainer = parentContainer;
        this.type = type;
        this.message = message;
        this.container = null;

        this.show();
    }

    show() {
        this.container = document.createElement('div');
        this.container.classList.add('notification');
        this.container.classList.add(`notification-${this.type}`);
        this.container.append(this.message);
        this.parentContainer.append(this.container);
    }

    hide() {
        if (this.container) {
            this.container.remove();
        }
    }
}

export default Notification;