import Medication from '../Models/medicationModel.mjs';

// Your medication controller functions
const createMedication = async (req, res) => {
    try {
        // Create and save a new medication using the Medication model
        const { name, dosage, prescriptionDetails } = req.body;
        if(!name){
            res.status(404).json({success:'false',message:'Name of medication is required'});
        }
        const newMedication = await Medication.create({ name, dosage, prescriptionDetails });

        return res.status(201).json({ success: true, newMedication });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating medication' });
    }
};

// Update Medication 
const updateMedication = async (req, res) => {
    try {
        // Get the medication ID from the request parameters
        const { id } = req.params;

        // Check if the medication exists
        const medication = await Medication.findById(id);
        if (!medication) {
            return res.status(404).json({ success: false, message: 'Medication not found' });
        }

        // Update the medication fields with the data from the request body
        const { name, dosage, prescriptionDetails } = req.body;
        medication.name = name ? name : medication.name;
        medication.dosage = dosage ? dosage : medication.dosage;
        medication.prescriptionDetails = prescriptionDetails ? prescriptionDetails : medication.prescriptionDetails;

        // Save the updated medication
        await medication.save();

        return res.status(200).json({ success: true, message: 'Medication updated', medication });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error updating medication' });
    }
}

const getMedication = async (req,res)=>{
    try {
        const data = await Medication.find({});
        res.status(200).json({success:'true',data});
    } catch (error) {
        res.status(401).json({success:'false',message:'Error Occured'});
    }
}

// Export your controller functions
export { createMedication, updateMedication, getMedication };
