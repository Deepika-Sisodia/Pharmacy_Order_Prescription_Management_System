import Order from '../models/Order.js';

// @desc    Get orders assigned to delivery agent
// @route   GET /api/delivery/orders
// @access  Private (Delivery Agent)
export const getAssignedOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            deliveryAgent: req.user._id,
            status: { $in: ['PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED'] }
        }).populate('user', 'name phone address').populate('items.medicineId');

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update delivery status (Picked Up / Delivered)
// @route   PUT /api/delivery/orders/:id/status
// @access  Private (Delivery Agent)
export const updateDeliveryStatus = async (req, res) => {
    try {
        const { status } = req.body; // 'OUT_FOR_DELIVERY', 'DELIVERED'
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.deliveryAgent.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this order' });
        }

        if (['OUT_FOR_DELIVERY', 'DELIVERED'].includes(status)) {
            order.status = status;
            await order.save();
            res.json(order);
        } else {
            res.status(400).json({ message: 'Invalid status for delivery agent' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
