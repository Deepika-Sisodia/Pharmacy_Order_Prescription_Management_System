import Order from '../models/Order.js';
import Prescription from '../models/Prescription.js';
import Medicine from '../models/Medicine.js';

// @desc    Get all orders (Pharmacist/Admin)
// @route   GET /api/pharmacist/orders
// @access  Private (Pharmacist/Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name')
            .populate('items.medicine')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Verify prescription (Approve/Reject)
// @route   PUT /api/pharmacist/prescriptions/:id/verify
// @access  Private (Pharmacist)
export const verifyPrescription = async (req, res) => {
    const { status, rejectionReason } = req.body;

    try {
        const prescription = await Prescription.findById(req.params.id);

        if (prescription) {
            prescription.status = status;
            prescription.verifiedBy = req.user._id;
            if (status === 'rejected') {
                prescription.rejectionReason = rejectionReason;
            }
            const updatedPrescription = await prescription.save();
            res.json(updatedPrescription);
        } else {
            res.status(404).json({ message: 'Prescription not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update order status
// @route   PUT /api/pharmacist/orders/:id/status
// @access  Private (Pharmacist)
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update inventory (stock)
// @route   PUT /api/pharmacist/inventory/:id
// @access  Private (Pharmacist)
export const updateInventory = async (req, res) => {
    const { stock } = req.body;

    try {
        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            medicine.stock = stock;
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
