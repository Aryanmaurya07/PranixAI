import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HINDI_FONT = { fontFamily: "'Tiro Devanagari Hindi', serif", fontWeight: 700 };

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h3l2-7 4 14 3-10 2 3h4"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl leading-none select-none flex items-baseline justify-center gap-0">
              <span style={HINDI_FONT} className="text-slate-900 text-[24px]">प्राण</span>
              <span className="font-bold text-slate-400 text-xl">.</span>
              <span className="font-bold text-teal-600 text-2xl">AI</span>
            </p>
            <p className="text-slate-400 text-sm mt-2">Loading your session...</p>
          </div>
          <div className="w-7 h-7 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;