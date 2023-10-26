import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dosage: String,
    prescriptionDetails: String,
});

export default mongoose.model('Medication', medicationSchema);
