import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
      {icon}
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-teal-400">{value}</div>
    <div className="text-slate-400 text-sm mt-1">{label}</div>
  </div>
);

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 text-sm text-teal-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            AI-Powered Health Assessment
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Your Health,{' '}
            <span className="text-teal-400">Understood</span>
            <br />Instantly
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe symptoms by typing, speaking, or uploading an image.
            PranixAI delivers an instant health assessment and connects you
            to the right doctor nearby.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all duration-200 hover:scale-105 active:scale-95">
              {isAuthenticated ? 'Go to Dashboard' : 'Start for Free'}
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-xl text-base transition-all duration-200">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 py-12 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8">
          <StatCard value="3" label="Input methods" />
          <StatCard value="AI" label="Gemini powered" />
          <StatCard value="Free" label="Always" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need, nothing you don't
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              From symptom input to doctor booking — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8">
                  <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"/>
                  <path d="M19.14 19.14L22 22" strokeLinecap="round"/>
                  <path d="M8 12h8M12 8v8" strokeLinecap="round"/>
                </svg>
              }
              title="Three ways to describe symptoms"
              desc="Type in natural language, speak into your mic, or upload a photo of visible symptoms. PranixAI understands all three."
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4" strokeLinecap="round"/>
                  <path d="M7 7h3m-3 4h5" strokeLinecap="round"/>
                </svg>
              }
              title="AI-powered health assessment"
              desc="Google Gemini AI analyses your symptoms and returns a structured report — probable condition, severity level, and home remedies."
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              }
              title="Find & book nearby doctors"
              desc="Based on your AI diagnosis, we show you relevant doctors near you on a live map. Book an appointment without leaving the app."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Describe symptoms', sub: 'Text, voice, or image' },
              { step: '02', title: 'AI analyses', sub: 'Gemini processes instantly' },
              { step: '03', title: 'Get assessment', sub: 'Condition + severity' },
              { step: '04', title: 'Find doctors', sub: 'Book nearby in one tap' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                  <div className="text-teal-500/40 text-4xl font-bold mb-3">{item.step}</div>
                  <div className="text-white font-medium text-sm mb-1">{item.title}</div>
                  <div className="text-slate-500 text-xs">{item.sub}</div>
                </div>
                {i < 3 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 -translate-y-1/2 text-slate-700 z-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start checking symptoms today
          </h2>
          <p className="text-slate-400 mb-8">Free forever. No credit card needed.</p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95">
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-teal-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-sm">Pranix<span className="text-teal-400">AI</span></span>
          </div>
          <p className="text-slate-500 text-xs">B.Tech Minor Project · CSE Year 3 · SAITM Gurugram</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;