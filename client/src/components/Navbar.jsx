import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isLanding = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isLanding
        ? 'bg-slate-950/80 backdrop-blur-md border-slate-800'
        : 'bg-slate-950 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Pranix<span className="text-teal-400">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard"
                  className="text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors hover:bg-slate-800">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 ml-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-xs font-semibold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-300">{user?.name}</span>
                  </div>
                  <button onClick={handleLogout}
                    className="text-sm text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-red-950/30 transition-colors">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors hover:bg-slate-800">
                  Login
                </Link>
                <Link to="/register"
                  className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                : <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 py-3 flex flex-col gap-1">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 text-slate-300 text-sm">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-xs font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  {user?.name}
                </div>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="text-left text-red-400 px-3 py-2 rounded-lg text-sm hover:bg-red-950/30 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="bg-teal-500 text-white px-3 py-2 rounded-lg text-sm font-medium text-center">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;