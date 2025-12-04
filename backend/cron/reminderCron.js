import cron from 'node-cron';
import Reminder from '../models/Reminder.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Configure Nodemailer (Placeholder)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'test@example.com',
        pass: process.env.EMAIL_PASS || 'password',
    },
});

const sendReminderEmail = async (email, medicineName) => {
    try {
        await transporter.sendMail({
            from: '"Pharmacy App" <noreply@pharmacyapp.com>',
            to: email,
            subject: `Refill Reminder: ${medicineName}`,
            text: `It's time to refill your medicine: ${medicineName}. Please visit our app to order.`,
        });
        console.log(`Reminder sent to ${email} for ${medicineName}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
    }
};

const startReminderCron = () => {
    // Run every day at 9 AM
    cron.schedule('0 9 * * *', async () => {
        console.log('Running Refill Reminder Cron Job...');
        try {
            const now = new Date();
            const reminders = await Reminder.find({
                nextReminder: { $lte: now },
                isActive: true,
            });

            for (const reminder of reminders) {
                const user = await User.findById(reminder.user);
                if (user) {
                    await sendReminderEmail(user.email, reminder.medicineName);

                    // Update next reminder date
                    reminder.lastSent = now;
                    const nextDate = new Date(now);
                    nextDate.setDate(nextDate.getDate() + reminder.intervalDays);
                    reminder.nextReminder = nextDate;
                    await reminder.save();
                }
            }
        } catch (error) {
            console.error('Error in Reminder Cron:', error);
        }
    });
};

export default startReminderCron;
