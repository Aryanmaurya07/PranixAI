import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-4 pb-16">
      <div className="max-w-4xl mx-auto">

        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">
            Hey, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-400">What would you like to do today?</p>
        </div>

        {/* Main CTA */}
        <Link to="/symptoms"
          className="block bg-teal-500 hover:bg-teal-400 transition-all duration-200 rounded-2xl p-8 mb-6 group hover:scale-[1.01] active:scale-[0.99]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/70 text-sm font-medium mb-1">AI Symptom Check</div>
              <div className="text-white text-2xl font-bold">Check your symptoms now</div>
              <div className="text-white/70 text-sm mt-2">Text · Voice · Image — all supported</div>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Link>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/history"
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 group">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-white font-semibold mb-1">Symptom history</div>
            <div className="text-slate-400 text-sm">View all past checks</div>
          </Link>

          <Link to="/nearby-doctors"
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 group">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div className="text-white font-semibold mb-1">Find doctors</div>
            <div className="text-slate-400 text-sm">Nearby healthcare providers</div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;