import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import VoiceInput from '../components/VoiceInput';
import ImageUpload from '../components/ImageUpload';
import usePageTitle from '../hooks/usePageTitle';

const tabs = [
  {
    id: 'text',
    label: 'Type',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'voice',
    label: 'Speak',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" strokeLinecap="round"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'image',
    label: 'Upload',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const examples = [
  'Fever for 2 days with sore throat and body aches',
  'Sharp chest pain when breathing deeply',
  'Itchy red rash on my forearm for 3 days',
  'Severe headache behind my eyes, sensitive to light',
  'Stomach pain after eating, bloating and nausea',
];

const SymptomInput = () => {
  usePageTitle('Check Symptoms');
  
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    if (activeTab === 'text' || activeTab === 'voice') {
      if (!textInput.trim() || textInput.trim().length < 5) {
        setError('Please describe your symptoms in at least 5 characters.');
        return;
      }
    }
    if (activeTab === 'image' && !imageData) {
      setError('Please upload an image of your symptoms.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        inputType: activeTab === 'voice' ? 'voice' : activeTab,
        ...(activeTab !== 'image' && { text: textInput }),
        ...(activeTab === 'image' && {
          imageBase64: imageData.base64,
          imageMimeType: imageData.mimeType
        })
      };

      const { data } = await api.post('/api/symptoms/analyze', payload);
      localStorage.setItem('pranix_last_result', JSON.stringify(data.result));
      navigate('/results');
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Powered by Google Gemini AI
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            What's going on?
          </h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Describe how you feel. PranixAI will analyse your symptoms and tell you what to do next.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Tab switcher */}
          <div className="flex border-b border-slate-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-b-2 border-transparent'
                }`}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 sm:p-8">

            {/* TEXT TAB */}
            {activeTab === 'text' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Describe your symptoms
                </label>
                <textarea
                  value={textInput}
                  onChange={e => { setTextInput(e.target.value); setError(''); }}
                  placeholder="e.g. I've had a fever of 101°F for the past 2 days along with a sore throat, body aches and fatigue..."
                  rows={5}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between mt-2 mb-5">
                  <span className="text-xs text-slate-400">Be as specific as possible for better results</span>
                  <span className={`text-xs font-medium ${textInput.length > 500 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {textInput.length}/500
                  </span>
                </div>

                {/* Quick examples */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Try an example</p>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((ex, i) => (
                      <button key={i} onClick={() => setTextInput(ex)}
                        className="text-xs text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 px-3 py-1.5 rounded-full transition-colors">
                        {ex.length > 40 ? ex.substring(0, 40) + '...' : ex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VOICE TAB */}
            {activeTab === 'voice' && (
              <VoiceInput value={textInput} onChange={setTextInput} />
            )}

            {/* IMAGE TAB */}
            {activeTab === 'image' && (
              <ImageUpload value={imageData} onChange={setImageData} />
            )}

            {/* Error */}
            {error && (
              <div className="mt-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analysing with AI...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Analyse My Symptoms
                </>
              )}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-400 text-xs mt-6 leading-relaxed max-w-md mx-auto">
          PranixAI provides preliminary health information only — not a medical diagnosis.
          Always consult a qualified healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
};

export default SymptomInput;