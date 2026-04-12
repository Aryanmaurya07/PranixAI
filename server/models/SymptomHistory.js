import mongoose from 'mongoose';

const symptomHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inputType: {
    type: String,
    enum: ['text', 'voice', 'image'],
    required: true
  },
  rawInput: {
    type: String,
    default: ''
  },
  imageBase64: {
    type: String,
    default: ''
  },
  condition: { type: String, default: '' },
  severity: {
    type: String,
    enum: ['Mild', 'Moderate', 'Serious'],
    default: 'Mild'
  },
  remedies: { type: String, default: '' },
  doctorType: { type: String, default: '' },
  description: { type: String, default: '' },
  fullAiResponse: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('SymptomHistory', symptomHistorySchema);