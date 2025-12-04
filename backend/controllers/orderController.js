import Order from '../models/Order.js';
import Medicine from '../models/Medicine.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    const {
        orderItems,
        deliveryAddress,
        paymentMethod, // Placeholder for now
        prescriptionId, // Optional
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        try {
            // Calculate total price and verify stock (simplified)
            let totalAmount = 0;
            const items = [];

            for (const item of orderItems) {
                const medicine = await Medicine.findById(item.medicine);
                if (!medicine) {
                    return res.status(404).json({ message: `Medicine not found: ${item.medicine}` });
                }
                // Check stock here if needed
                totalAmount += medicine.price * item.quantity;
                items.push({
                    medicine: medicine._id,
                    quantity: item.quantity,
                    price: medicine.price
                })
            }

            const order = new Order({
                user: req.user._id,
                items: items,
                totalAmount,
                deliveryAddress,
                prescription: prescriptionId,
                status: 'pending_verification', // Default status
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.medicine');

        if (order) {
            // Ensure user can only see their own orders (unless admin/pharmacist - added later)
            if (order.user._id.toString() !== req.user._id.toString() && req.user.role === 'customer') {
                return res.status(403).json({ message: 'Not authorized to view this order' });
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
