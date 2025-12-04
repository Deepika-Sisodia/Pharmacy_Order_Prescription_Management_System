import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    prescriptionUrl: {
        type: String,
    },
    items: [{
        medicineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['PENDING_VERIFICATION', 'REJECTED', 'APPROVED', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED'],
        default: 'PENDING_VERIFICATION',
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
