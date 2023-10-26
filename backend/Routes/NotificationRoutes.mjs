import express from 'express';
import {createNotification, updateNotification, deleteNotification, getUserNotifications} from '../Controllers/NotificationController.mjs';
import {verifyToken} from '../Config/jwt.mjs';

const notificationRouter = express.Router();

// Route to create a new notification
notificationRouter.post('/create', verifyToken,createNotification);

// Route to update a notification by ID
notificationRouter.put('/:id', verifyToken,updateNotification);

// Route to delete a notification by ID
notificationRouter.delete('/:id', verifyToken,deleteNotification);

// Route to get all notifications for a user
notificationRouter.post('/user', verifyToken,getUserNotifications);

export default notificationRouter;
