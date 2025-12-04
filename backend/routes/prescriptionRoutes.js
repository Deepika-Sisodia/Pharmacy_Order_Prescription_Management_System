import express from 'express';
import { uploadPrescription, getMyPrescriptions } from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, uploadPrescription);
router.get('/my', protect, getMyPrescriptions);

export default router;
