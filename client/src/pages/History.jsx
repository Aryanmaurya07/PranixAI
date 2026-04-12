import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import SeverityBadge from '../components/SeverityBadge';

const inputTypeIcon = {
  text: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  voice: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
      <path d="M19 10v2a7 7 0 01-14 0v-2" strokeLinecap="round"/>
    </svg>
  ),
  image: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21" strokeLinecap="round"/>
    </svg>
  )
};

const HistoryCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(item.createdAt);
  const remedies = item.remedies ? item.remedies.split(';').map(r => r.trim()).filter(Boolean) : [];

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-sm ${
      expanded ? 'border-teal-300 shadow-sm' : 'border-slate-200 hover:border-slate-300'
    }`}>
      <button className="w-full text-left p-5 flex items-center gap-4" onClick={() => setExpanded(!expanded)}>
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-slate-900 text-sm">{item.condition}</span>
            <SeverityBadge severity={item.severity} />
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              {inputTypeIcon[item.inputType]}
              {item.inputType}
            </span>
            <span>·</span>
            <span>{date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span>·</span>
            <span>{date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"
          className={`flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</p>
            <p className="text-sm text-slate-600 leading-relaxed">{item.description || 'No description available.'}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Specialist</p>
            <div className="flex items-center gap-2">
              <span className="bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
                {item.doctorType}
              </span>
            </div>
          </div>
          {remedies.length > 0 && (
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Home care</p>
              <ul className="space-y-1.5">
                {remedies.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.rawInput && (
            <div className="sm:col-span-2 bg-slate-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Original input</p>
              <p className="text-xs text-slate-500 italic">"{item.rawInput}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/api/symptoms/history')
      .then(({ data }) => setHistory(data.history || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? history : history.filter(h => h.severity === filter);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Symptom history</h1>
            <p className="text-slate-500 mt-1">{history.length} check{history.length !== 1 ? 's' : ''} recorded</p>
          </div>
          <Link to="/symptoms"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm hover:shadow-md hover:shadow-teal-500/20">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
            New check
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'Mild', 'Moderate', 'Serious'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}>
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-slate-100 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">
              {filter === 'all' ? 'No checks yet' : `No ${filter} results`}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {filter === 'all'
                ? 'Start your first symptom check to see your health history here.'
                : `You have no ${filter.toLowerCase()} severity records.`}
            </p>
            {filter === 'all' && (
              <Link to="/symptoms"
                className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors text-sm">
                Check symptoms now
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(item => <HistoryCard key={item._id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;