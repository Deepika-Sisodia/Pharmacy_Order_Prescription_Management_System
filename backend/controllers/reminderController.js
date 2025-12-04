import Reminder from '../models/Reminder.js';

// @desc    Set a refill reminder
// @route   POST /api/reminders
// @access  Private
export const setReminder = async (req, res) => {
    try {
        const { medicineName, intervalDays } = req.body;

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + intervalDays);

        const reminder = await Reminder.create({
            user: req.user._id,
            medicineName,
            intervalDays,
            nextReminder: nextDate,
        });

        res.status(201).json(reminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my reminders
// @route   GET /api/reminders
// @access  Private
export const getMyReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ user: req.user._id });
        res.json(reminders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
