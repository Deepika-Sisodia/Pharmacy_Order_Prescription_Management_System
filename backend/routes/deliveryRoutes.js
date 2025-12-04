import express from 'express';
import { getAssignedOrders, updateDeliveryStatus } from '../controllers/deliveryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/orders', protect, authorize('delivery_agent'), getAssignedOrders);
router.put('/orders/:id/status', protect, authorize('delivery_agent'), updateDeliveryStatus);

export default router;
