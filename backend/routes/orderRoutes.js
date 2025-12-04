import express from 'express';
import { createOrder, getMyOrders, getOrderById, updateOrderStatus, assignDeliveryAgent } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, authorize('pharmacist', 'admin', 'delivery_agent'), updateOrderStatus);
router.put('/:id/assign', protect, authorize('pharmacist', 'admin'), assignDeliveryAgent);

export default router;
