import Prescription from '../models/Prescription.js';
import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
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
            return res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                return res.status(400).json({ message: 'No file selected!' });
            } else {
                try {
                    const prescription = await Prescription.create({
                        user: req.user._id,
                        image: `/uploads/${req.file.filename}`,
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
