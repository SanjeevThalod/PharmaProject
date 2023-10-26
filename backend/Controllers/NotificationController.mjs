import Notification from '../Models/notificationModel.mjs';

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { message, deliveryMethod, time, medicine } = req.body;
    const { userId } = req.user;
    if (!userId) {
      res.status(404).json({ success: 'false', message: 'User not found' });
    }
    console.log(message," ",deliveryMethod," ",time," ",medicine);
    const notification = await Notification.create({ userId, message, deliveryMethod, time, medicine });

    return res.status(201).json({ success: true, notification });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error creating notification' });
  }
};

// Update a notification
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, deliveryMethod } = req.body;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.message = message ? message : notification.message;
    notification.deliveryMethod = deliveryMethod ? deliveryMethod : notification.deliveryMethod;

    await notification.save();

    return res.status(200).json({ success: true, message: 'Notification updated', notification });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error updating notification' });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    await notification.deleteOne({id});

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error deleting notification' });
  }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.user;

    const notifications = await Notification.find({ userId });
    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error retrieving notifications' });
  }
}

// Other notification controller functions

// Export your controller functions
export {
  createNotification,
  updateNotification,
  deleteNotification,
  getUserNotifications,
  // other functions
};
