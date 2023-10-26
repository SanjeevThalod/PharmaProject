import Notification from '../Models/notificationModel.mjs';
import User from '../Models/userModel.mjs';
import Nodemailer from '../Miscellaneous/Nodemailer.mjs';
import { sendSMS, sendWhatsApp } from '../Miscellaneous/Twilio.mjs';
import { makeCALL } from '../Miscellaneous/Exotel.mjs';
import caretakerModel from '../Models/caretakerModel.mjs';

console.log('Timer Started');

const calls = async (notification, user) => {
    if (notification.deliveryMethod == 'SMS') {
        await sendSMS(user.phone, notification);
        await sendWhatsApp(user.phone, notification);
    } else if (notification.deliveryMethod == 'Email') {
        await Nodemailer(notification, user);
    } else if (notification.deliveryMethod == 'Call') {
        await makeCALL(user.phone);
    } else if (notification.deliveryMethod == 'WhatsApp') {
        await sendWhatsApp(user.phone, notification);
    }
}

const CheckTime = async () => {
    const curr_time = new Date();

    // Get hours and minutes in 24-hour format
    const hours = curr_time.getHours().toString().padStart(2, '0'); // Ensure it's two digits
    const minutes = curr_time.getMinutes().toString().padStart(2, '0'); // Ensure it's two digits

    const formattedTime = `${hours}:${minutes}`;

    console.log(formattedTime);

    try {
        const noti = await Notification.find({ time: { $in: [formattedTime] } });


        for (const notification of noti) {
            const user = await User.findById(notification.userId);
            const caretakerIds = await caretakerModel.findOne({ userId: notification.userId });

            for (const userId of caretakerIds) {
                try {
                    const user = await User.findOne({ _id: userId });
                    if (user) {
                        calls(notification,user);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            calls(notification,user);
        }
    } catch (error) {
        console.log('Error: ', error);
    }
}

export default CheckTime;