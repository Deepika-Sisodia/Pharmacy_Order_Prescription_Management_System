import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    medicineName: { type: String, required: true },
    intervalDays: { type: Number, required: true }, // e.g., every 30 days
    lastSent: { type: Date, default: Date.now },
    nextReminder: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Reminder', reminderSchema);
