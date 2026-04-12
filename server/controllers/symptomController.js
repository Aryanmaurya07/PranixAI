import { GoogleGenerativeAI } from '@google/generative-ai';
import SymptomHistory from '../models/SymptomHistory.js';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = 'gemini-2.0-flash';

const TEXT_PROMPT = (symptoms) => `
You are a compassionate and intelligent medical AI assistant named PranixAI.
A patient describes their symptoms: "${symptoms}"

Analyse the symptoms carefully and respond ONLY with a valid JSON object in this exact format — no extra text, no markdown:
{
  "condition": "probable condition name (be specific, e.g. Viral Pharyngitis, Contact Dermatitis)",
  "severity": "Mild" or "Moderate" or "Serious",
  "description": "2-3 sentence explanation of the condition in clear, non-jargon language",
  "remedies": "3-4 specific home care steps the patient can take immediately, separated by semicolons",
  "doctorType": "exact specialist type to consult (e.g. General Physician, Dermatologist, ENT Specialist, Cardiologist)",
  "urgency": "how soon to see a doctor (e.g. Within 24 hours, Within a week, If symptoms worsen)"
}
`;

const IMAGE_PROMPT = `
You are PranixAI, an intelligent medical image analysis assistant.
Analyse this image of a patient's visible symptom carefully.

Respond ONLY with a valid JSON object in this exact format — no extra text, no markdown:
{
  "condition": "probable condition visible in the image",
  "severity": "Mild" or "Moderate" or "Serious",
  "description": "2-3 sentence description of what you observe and what it likely indicates",
  "remedies": "3-4 specific care steps, separated by semicolons",
  "doctorType": "specialist to consult",
  "urgency": "how soon to see a doctor"
}
`;

const parseAIResponse = (text) => {
  try {
    const cleaned = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      condition: 'Unable to determine',
      severity: 'Moderate',
      description: 'The AI could not fully analyse the input. Please try describing your symptoms in more detail.',
      remedies: 'Rest and stay hydrated; Monitor symptoms closely; Avoid self-medication',
      doctorType: 'General Physician',
      urgency: 'Within 24 hours'
    };
  }
};

export const analyzeSymptoms = async (req, res) => {
  try {
    const { inputType, text, imageBase64, imageMimeType } = req.body;

    if (!inputType) {
      return res.status(400).json({ message: 'inputType is required' });
    }

    const model = genAI.getGenerativeModel({ model:MODEL_NAME});
    let result;

    if (inputType === 'image') {
      if (!imageBase64) {
        return res.status(400).json({ message: 'Image data is required for image analysis' });
      }
      result = await model.generateContent([
        { inlineData: { data: imageBase64, mimeType: imageMimeType || 'image/jpeg' } },
        IMAGE_PROMPT
      ]);
    } else {
      const symptoms = text?.trim();
      if (!symptoms) {
        return res.status(400).json({ message: 'Symptom text is required' });
      }
      result = await model.generateContent(TEXT_PROMPT(symptoms));
    }

    const responseText = result.response.text();
    const parsed = parseAIResponse(responseText);

    const history = await SymptomHistory.create({
      userId: req.user._id,
      inputType,
      rawInput: inputType !== 'image' ? (text || '') : '',
      imageBase64: inputType === 'image' ? imageBase64.substring(0, 100) : '',
      condition: parsed.condition,
      severity: parsed.severity,
      remedies: parsed.remedies,
      doctorType: parsed.doctorType,
      description: parsed.description,
      fullAiResponse: responseText
    });

    res.json({
      success: true,
      result: { ...parsed, historyId: history._id }
    });

  } catch (error) {
    console.error('AI Analysis error:', error);
    res.status(500).json({ message: 'AI analysis failed. Please try again.', error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await SymptomHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-imageBase64 -fullAiResponse')
      .limit(50);

    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};