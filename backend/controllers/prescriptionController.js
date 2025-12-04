import Prescription from '../models/Prescription.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Set up storage engine (S3)
const storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(
            null,
            `prescriptions/${file.fieldname}-${Date.now()}${path.extname(
                file.originalname
            )}`
        );
    },
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
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
            return res.status(400).json({ message: err.message || err });
        } else {
            if (req.file == undefined) {
                return res.status(400).json({ message: 'No file selected!' });
            } else {
                try {
                    const prescription = await Prescription.create({
                        user: req.user._id,
                        image: req.file.location, // S3 URL
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
