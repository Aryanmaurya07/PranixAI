import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SeverityBadge from '../components/SeverityBadge';

const InfoCard = ({ icon, label, value, sub }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-200 hover:shadow-sm transition-all">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-slate-900 font-semibold text-sm leading-snug">{value}</p>
        {sub && <p className="text-slate-400 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  </div>
);

const Results = () => {
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('pranix_last_result');
    if (!saved) { navigate('/symptoms'); return; }
    setResult(JSON.parse(saved));
    setTimeout(() => setAnimate(true), 100);
  }, []);

  if (!result) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const remedyList = result.remedies
    ? result.remedies.split(';').map(r => r.trim()).filter(Boolean)
    : [];

  const severityColor = {
    Mild: 'from-green-50 to-teal-50 border-green-200',
    Moderate: 'from-amber-50 to-orange-50 border-amber-200',
    Serious: 'from-red-50 to-rose-50 border-red-200'
  }[result.severity] || 'from-slate-50 to-white border-slate-200';

  return (
    <div className={`min-h-screen bg-slate-50 pt-20 transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Assessment complete</h1>
          <p className="text-slate-500">Here's what PranixAI found based on your symptoms</p>
        </div>

        {/* Main condition card */}
        <div className={`bg-gradient-to-br ${severityColor} border rounded-3xl p-7 mb-6`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Probable condition</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{result.condition}</h2>
            </div>
            <SeverityBadge severity={result.severity} showBar />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{result.description}</p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InfoCard
            label="Consult"
            value={result.doctorType}
            sub="Recommended specialist"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
          />
          <InfoCard
            label="Urgency"
            value={result.urgency || 'See a doctor soon'}
            sub="When to seek care"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" strokeLinecap="round"/></svg>}
          />
        </div>

        {/* Remedies */}
        {remedyList.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home care steps
            </h3>
            <ul className="space-y-3">
              {remedyList.map((remedy, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {remedy}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Serious warning */}
        {result.severity === 'Serious' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 flex gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <p className="font-semibold text-red-700 text-sm">Seek medical attention promptly</p>
              <p className="text-red-600 text-xs mt-1">Your symptoms indicate a condition that needs urgent professional evaluation. Please see a doctor as soon as possible or visit the nearest emergency facility.</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/nearby-doctors"
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-2xl text-center transition-all hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            Find nearby doctors
          </Link>
          <Link to="/symptoms"
            className="flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-4 px-6 rounded-2xl text-center transition-all hover:shadow-sm active:scale-[0.98] flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" strokeLinecap="round"/>
            </svg>
            Check again
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-slate-400 text-xs mt-8 leading-relaxed max-w-md mx-auto">
          This assessment is AI-generated and for informational purposes only.
          It is not a substitute for professional medical diagnosis or treatment.
        </p>
      </div>
    </div>
  );
};

export default Results;