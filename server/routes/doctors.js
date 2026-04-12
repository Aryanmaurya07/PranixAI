import express from 'express';
import { getNearbyDoctors, bookAppointment, getBookings } from '../controllers/doctorController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/nearby', protect, getNearbyDoctors);
router.post('/book', protect, bookAppointment);
router.get('/bookings', protect, getBookings);

export default router;