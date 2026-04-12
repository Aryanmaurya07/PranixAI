import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import SeverityBadge from '../components/SeverityBadge';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/symptoms/history')
      .then(({ data }) => setRecentHistory((data.history || []).slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Greeting */}
        <div className="mb-10">
          <p className="text-slate-400 text-sm font-medium mb-1">{greeting}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-500 mt-2">How are you feeling today?</p>
        </div>

        {/* Primary CTA */}
        <Link to="/symptoms"
          className="group block bg-teal-600 hover:bg-teal-700 rounded-3xl p-7 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20 hover:scale-[1.01] active:scale-[0.99]">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                AI-Powered · 3 input modes
              </div>
              <h2 className="text-white text-2xl sm:text-3xl font-extrabold mb-1">Check your symptoms</h2>
              <p className="text-teal-100 text-sm">Type, speak, or upload a photo — results in seconds</p>
            </div>
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center group-hover:bg-white/25 transition-colors flex-shrink-0 ml-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Link>

        {/* Quick action grid */}
       {/* Quick action grid */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
  <Link to="/nearby-doctors"
    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all hover:shadow-sm group">
    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    </div>
    <p className="font-semibold text-slate-900 text-sm">Find doctors</p>
    <p className="text-slate-400 text-xs mt-0.5">Near your location</p>
  </Link>

  <Link to="/history"
    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all hover:shadow-sm group">
    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-purple-50 border border-purple-100 group-hover:bg-purple-100 transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round"/>
      </svg>
    </div>
    <p className="font-semibold text-slate-900 text-sm">My history</p>
    <p className="text-slate-400 text-xs mt-0.5">{recentHistory.length} recent checks</p>
  </Link>

  <Link to="/contact"
    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all hover:shadow-sm group">
    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-amber-50 border border-amber-100 group-hover:bg-amber-100 transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    </div>
    <p className="font-semibold text-slate-900 text-sm">Give feedback</p>
    <p className="text-slate-400 text-xs mt-0.5">Help us improve</p>
  </Link>
</div>

        {/* Recent checks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent checks</h2>
            <Link to="/history" className="text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2].map(i => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 animate-pulse flex gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentHistory.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm mb-3">No symptom checks yet</p>
              <Link to="/symptoms"
                className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
                Make your first check →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentHistory.map(item => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm">{item.condition}</span>
                      <SeverityBadge severity={item.severity} />
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{item.doctorType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;