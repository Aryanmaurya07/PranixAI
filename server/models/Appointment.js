import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorAddress: { type: String, default: '' },
  doctorType: { type: String, default: '' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);