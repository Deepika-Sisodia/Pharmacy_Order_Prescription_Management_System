import Prescription from '../models/Prescription.js';
import multer from 'multer';
import path from 'path';

import { storage } from '../config/cloudinary.js';

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    // fileFilter is handled by CloudinaryStorage params mostly, but we can keep additional checks if needed
    // For simplicity with CloudinaryStorage, we rely on allowed_formats there
}).single('image'); // 'image' is the field name

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and PDFs Only!');
    }
}

// @desc    Upload a prescription
// @route   POST /api/prescriptions
// @access  Private (Customer)
export const uploadPrescription = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                return res.status(400).json({ message: 'No file selected!' });
            } else {
                try {
                    const prescription = await Prescription.create({
                        user: req.user._id,
                        image: req.file.path, // Cloudinary returns the URL in 'path'
                        status: 'pending',
                    });
                    res.status(201).json(prescription);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Server Error' });
                }
            }
        }
    });
};

// @desc    Get my prescriptions
// @route   GET /api/prescriptions/my
// @access  Private
export const getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ user: req.user._id });
        res.json(prescriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
