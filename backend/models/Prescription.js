import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }, // URL to S3 or similar
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionReason: { type: String },
    doctorName: { type: String },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Pharmacist
}, { timestamps: true });

export default mongoose.model('Prescription', prescriptionSchema);
