import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String }, // URL
    requiresPrescription: { type: Boolean, default: false },
    expiryDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Medicine', medicineSchema);
