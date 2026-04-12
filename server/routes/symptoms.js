import express from 'express';
import { analyzeSymptoms, getHistory } from '../controllers/symptomController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/analyze', protect, analyzeSymptoms);
router.get('/history', protect, getHistory);

export default router;