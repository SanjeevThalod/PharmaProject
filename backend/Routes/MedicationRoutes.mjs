import express from 'express';
import { createMedication, updateMedication, getMedication } from '../Controllers/MedicationController.mjs';

const medicationRouter = express.Router();

// Route to create a new medication
medicationRouter.post('/create',createMedication);

// Route to update a medication by ID
medicationRouter.put('/:id',updateMedication);

// Get all medication
medicationRouter.get('/all',getMedication);

export default medicationRouter;
