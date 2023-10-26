import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String
    },
    time: [
        String
    ],
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    deliveryMethod: {
        type: String,
        enum: ['SMS', 'Email', 'Call','WhatsApp'], // Enum specifying the allowed values
        required: true
    }
});

export default mongoose.model('Notification', notificationSchema);
