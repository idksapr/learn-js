import Notification from './Notification.js';
/**
 * @param container
 * @param multiView
 * @param autoClose
 * @param timeout
 * @returns {function(...[*]=)}
 */
export default function notifier(container, multiView = false, autoClose = true, timeout = 3000) {
    let notifications = [];

    return (message, type = 'info') => {
        if (!multiView && notifications) {
            for (let notification of notifications) {
                notification.hide();
            }
        }
        let notification = new Notification(container, message, type);
        notifications.push(notification);

        if (autoClose) {
            setTimeout(notification.hide.bind(notification), timeout);
        }
    }
}