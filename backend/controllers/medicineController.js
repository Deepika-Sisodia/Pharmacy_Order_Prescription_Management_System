import Medicine from '../models/Medicine.js';

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
export const getMedicines = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const medicines = await Medicine.find({ ...keyword });
        res.json(medicines);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get medicine by ID
// @route   GET /api/medicines/:id
// @access  Public
export const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            res.json(medicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
