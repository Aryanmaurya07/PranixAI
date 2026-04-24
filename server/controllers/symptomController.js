
import axios from 'axios';
import SymptomHistory from '../models/SymptomHistory.js';
import dotenv from 'dotenv';
dotenv.config();


//   GROQ MODEL
const MODEL_NAME = 'llama-3.3-70b-versatile';

const TEXT_PROMPT = (symptoms) => `
You are a compassionate and intelligent medical AI assistant named PranixAI.

A patient describes symptoms:
"${symptoms}"

Analyse symptoms carefully and respond ONLY with valid JSON:

{
  "condition": "probable condition name (specific if possible)",
  "severity": "Mild or Moderate or Serious",
  "description": "2-3 sentence explanation in simple language",
  "remedies": "3-4 practical home care steps separated by semicolons",
  "doctorType": "best specialist doctor",
  "urgency": "when to consult doctor"
}
`;

const IMAGE_PROMPT = `
Analyse visible medical symptom image and reply ONLY valid JSON:
{
  "condition": "probable visible condition",
  "severity": "Mild or Moderate or Serious",
  "description": "2-3 sentence explanation",
  "remedies": "3-4 remedies separated by semicolons",
  "doctorType": "best specialist doctor",
  "urgency": "when to consult doctor"
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
      description:
        'The AI could not fully analyse the input. Please provide more details.',
      remedies:
        'Rest; Stay hydrated; Monitor symptoms; Avoid self-medication',
      doctorType: 'General Physician',
      urgency: 'Within 24 hours'
    };
  }
};

export const analyzeSymptoms = async (req, res) => {
  try {
    const { inputType, text, imageBase64 } = req.body;

    if (!inputType) {
      return res.status(400).json({
        message: 'inputType is required'
      });
    }

    let responseText = '';


    if (inputType === 'image') {
      return res.json({
        success: false,
        message: 'Image analysis temporarily disabled in Groq version'
      });
    }

    const symptoms = text?.trim();

    if (!symptoms) {
      return res.status(400).json({
        message: 'Symptom text is required'
      });
    }

    const aiResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: TEXT_PROMPT(symptoms)
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    responseText =
      aiResponse.data.choices?.[0]?.message?.content || '';

    const parsed = parseAIResponse(responseText);

    const history = await SymptomHistory.create({
      userId: req.user._id,
      inputType,
      rawInput: inputType !== 'image' ? (text || '') : '',
      imageBase64:
        inputType === 'image'
          ? imageBase64?.substring(0, 100)
          : '',
      condition: parsed.condition,
      severity: parsed.severity,
      remedies: parsed.remedies,
      doctorType: parsed.doctorType,
      description: parsed.description,
      fullAiResponse: responseText
    });

    res.json({
      success: true,
      result: {
        ...parsed,
        historyId: history._id
      }
    });

  } catch (error) {
    console.error(
      'AI Analysis error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      message: 'AI analysis failed. Please try again.',
      error: error.response?.data || error.message
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await SymptomHistory.find({
      userId: req.user._id
    })
      .sort({ createdAt: -1 })
      .select('-imageBase64 -fullAiResponse')
      .limit(50);

    res.json({ history });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch history'
    });
  }
};