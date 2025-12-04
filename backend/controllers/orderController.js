import Order from '../models/Order.js';
import Medicine from '../models/Medicine.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer)
export const createOrder = async (req, res) => {
    try {
        const { prescriptionUrl, deliveryAddress, items } = req.body;

        let orderItems = [];
        let total = 0;

        if (items && items.length > 0) {
            for (const item of items) {
                const medicine = await Medicine.findById(item.medicineId);
                if (medicine) {
                    orderItems.push({
                        medicineId: medicine._id,
                        quantity: item.quantity,
                        price: medicine.price
                    });
                    total += medicine.price * item.quantity;
                }
            }
        }

        const order = await Order.create({
            user: req.user._id,
            prescriptionUrl,
            deliveryAddress,
            items: orderItems,
            totalAmount: total,
            status: 'PENDING_VERIFICATION',
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
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
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.medicineId');

        if (order) {
            // Check if user is owner or admin/pharmacist/delivery
            if (order.user._id.toString() === req.user._id.toString() || ['pharmacist', 'admin', 'delivery_agent'].includes(req.user.role)) {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update order status (Pharmacist/Delivery)
// @route   PUT /api/orders/:id/status
// @access  Private (Pharmacist/Delivery Agent)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, items, totalAmount } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Logic for Pharmacist Approval
        if (status === 'APPROVED' && order.status === 'PENDING_VERIFICATION') {
            if (req.user.role !== 'pharmacist' && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized' });
            }

            // Update items and total amount if provided (Pharmacist creates bill)
            if (items) order.items = items;
            if (totalAmount) order.totalAmount = totalAmount;

            // Smart Stock Deduction
            if (items && items.length > 0) {
                for (const item of items) {
                    const medicine = await Medicine.findById(item.medicineId);
                    if (medicine) {
                        if (medicine.stock < item.quantity) {
                            return res.status(400).json({ message: `Insufficient stock for ${medicine.name}` });
                        }
                        medicine.stock -= item.quantity;
                        await medicine.save();
                    }
                }
            }
        }

        // Logic for Delivery Agent
        if (['OUT_FOR_DELIVERY', 'DELIVERED'].includes(status)) {
            if (req.user.role !== 'delivery_agent' && req.user.role !== 'admin') {
                // Also allow pharmacist to set OUT_FOR_DELIVERY if they manage it
                if (status === 'OUT_FOR_DELIVERY' && req.user.role !== 'pharmacist') {
                    return res.status(403).json({ message: 'Not authorized' });
                }
            }
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Assign Delivery Agent
// @route   PUT /api/orders/:id/assign
// @access  Private (Pharmacist/Admin)
export const assignDeliveryAgent = async (req, res) => {
    try {
        const { deliveryAgentId } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.deliveryAgent = deliveryAgentId;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
