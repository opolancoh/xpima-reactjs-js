import {
    notification
} from 'antd';

export const notificationBox = (message, type, title) => {
    let notificationType = 'info'
    let notificationTitle = 'Information'
    if (type === 'success') {
        notificationType = 'success';
        notificationTitle = 'Success';
    } else if (type === 'warning') {
        notificationType = 'warning';
        notificationTitle = 'Warning';
    } else if (type === 'error') {
        notificationType = 'error';
        notificationTitle = 'Error';
    }

    if (title)
        notificationTitle = title;

    notification[notificationType]({
        message: notificationTitle,
        description: message,
    });
};