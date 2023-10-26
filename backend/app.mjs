import express from 'express';
import Cors from 'cors';
const app = express();

// Routes Import
import userRoutes from './Routes/UserRoutes.mjs';
import medicationRoutes from './Routes/MedicationRoutes.mjs';
import notificationRoutes from './Routes/NotificationRoutes.mjs';
import CareTaker from './Routes/CareTakerRoutes.mjs';

// Setting up Middleware
app.use(Cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/caretaker',CareTaker);

export default app;
