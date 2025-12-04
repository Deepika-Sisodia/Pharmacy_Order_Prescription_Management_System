import express from 'express';
import {
    getAllOrders,
    verifyPrescription,
    updateOrderStatus,
    updateInventory,
} from '../controllers/pharmacistController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and require pharmacist role
router.use(protect);
router.use(authorize('pharmacist', 'admin'));

router.get('/orders', getAllOrders);
router.put('/prescriptions/:id/verify', verifyPrescription);
router.put('/orders/:id/status', updateOrderStatus);
router.put('/inventory/:id', updateInventory);

export default router;
