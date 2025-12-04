import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true } // Price at time of order
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending_verification', 'processing', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending_verification'
    },
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Or DeliveryAgent model
    deliveryAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
