import express from 'express';
import { getMedicines, getMedicineById, addMedicine, updateMedicine } from '../controllers/medicineController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMedicines);
router.get('/:id', getMedicineById);
router.post('/', protect, authorize('pharmacist', 'admin'), addMedicine);
router.put('/:id', protect, authorize('pharmacist', 'admin'), updateMedicine);

export default router;
