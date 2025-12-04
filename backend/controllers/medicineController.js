import Medicine from '../models/Medicine.js';

// @desc    Get all medicines or search
// @route   GET /api/medicines
// @access  Public
export const getMedicines = async (req, res) => {
    try {
        const { keyword } = req.query;
        let query = {};

        if (keyword) {
            query = {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { brand: { $regex: keyword, $options: 'i' } },
                    { genericName: { $regex: keyword, $options: 'i' } },
                    { symptoms: { $regex: keyword, $options: 'i' } },
                ],
            };
        }

        const medicines = await Medicine.find(query);
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

// @desc    Add a medicine
// @route   POST /api/medicines
// @access  Private (Admin/Pharmacist)
export const addMedicine = async (req, res) => {
    try {
        const { name, brand, genericName, category, description, price, stock, symptoms, requiresPrescription, expiryDate } = req.body;

        const medicine = new Medicine({
            name,
            brand,
            genericName,
            category,
            description,
            price,
            stock,
            symptoms,
            requiresPrescription,
            expiryDate
        });

        const createdMedicine = await medicine.save();
        res.status(201).json(createdMedicine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update medicine (Stock/Price)
// @route   PUT /api/medicines/:id
// @access  Private (Pharmacist/Admin)
export const updateMedicine = async (req, res) => {
    try {
        const { name, brand, genericName, category, description, price, stock, symptoms, requiresPrescription, expiryDate } = req.body;

        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            medicine.name = name || medicine.name;
            medicine.brand = brand || medicine.brand;
            medicine.genericName = genericName || medicine.genericName;
            medicine.category = category || medicine.category;
            medicine.description = description || medicine.description;
            medicine.price = price || medicine.price;
            medicine.stock = stock !== undefined ? stock : medicine.stock;
            medicine.symptoms = symptoms || medicine.symptoms;
            medicine.requiresPrescription = requiresPrescription !== undefined ? requiresPrescription : medicine.requiresPrescription;
            medicine.expiryDate = expiryDate || medicine.expiryDate;

            const updatedMedicine = await medicine.save();
            res.json(updatedMedicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
