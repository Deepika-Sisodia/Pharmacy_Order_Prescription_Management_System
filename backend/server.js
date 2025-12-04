import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';

import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import pharmacistRoutes from './routes/pharmacistRoutes.js';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/pharmacist', pharmacistRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get("/", (req, res) => {
    res.send("Hello World!");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
