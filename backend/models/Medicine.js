import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    genericName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    symptoms: [{ type: String }], // Array of symptoms treated
    image: { type: String },
    requiresPrescription: { type: Boolean, default: false },
    expiryDate: { type: Date },
}, { timestamps: true });

// Index for search
medicineSchema.index({ name: 'text', brand: 'text', genericName: 'text', symptoms: 'text' });

export default mongoose.model('Medicine', medicineSchema);
