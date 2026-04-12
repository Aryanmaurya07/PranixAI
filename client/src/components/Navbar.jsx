import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.2"/>
      </svg>
    </div>
    <span className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">
      Pranix<span className="text-teal-600">AI</span>
    </span>
  </Link>
);

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
        active
          ? 'text-teal-600'
          : 'text-slate-600 hover:text-slate-900'
      }`}
    >
      {children}
      <span className={`absolute left-0 bottom-0 h-[2px] bg-teal-600 transition-all duration-300 ${
        active ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></span>
    </Link>
  );
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-dropdown')) {
        setMoreOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-lg shadow-md'
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        <Logo />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">

          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {/* More Dropdown */}
          <div className="relative navbar-dropdown">
            <button
              onClick={() => {
                setMoreOpen(!moreOpen);
                setProfileOpen(false);
              }}
              className="px-3 py-2 text-sm hover:text-teal-600 transition"
            >
              More ⌄
            </button>

            <div className={`absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg transform transition-all duration-300 ${
              moreOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <Link to="/privacy" className="block px-4 py-2 hover:bg-gray-100">Privacy</Link>
              <Link to="/terms" className="block px-4 py-2 hover:bg-gray-100">Terms</Link>
            </div>
          </div>

        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-teal-600 hover:scale-105 transition">
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <div className="relative navbar-dropdown">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setMoreOpen(false);
                  }}
                  className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl hover:shadow-md transition"
                >
                  <div className="w-7 h-7 bg-teal-600 text-white flex items-center justify-center rounded-full text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  {user?.name}
                </button>

                <div className={`absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg transform transition-all duration-300 ${
                  profileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <Link to="/history" className="block px-4 py-2 hover:bg-gray-100">History</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;