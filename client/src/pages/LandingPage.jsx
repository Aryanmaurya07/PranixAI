import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <div className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-teal-200 mb-4">
    {children}
  </div>
);

const FeatureCard = ({ icon, title, desc, tag }) => (
  <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
    {tag && (
      <span className="inline-block text-xs font-semibold bg-teal-50 text-teal-600 px-2 py-0.5 rounded-md mb-4">
        {tag}
      </span>
    )}
    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
      {icon}
    </div>
    <h3 className="font-semibold text-slate-900 mb-2 text-[15px]">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, avatar }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
    <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        {avatar}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900">{name}</div>
        <div className="text-xs text-slate-400">{role}</div>
      </div>
    </div>
  </div>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors">
        <span className="font-medium text-slate-900 text-sm pr-4">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white border-t border-slate-100">
          <p className="text-slate-500 text-sm leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
};

const StatItem = ({ value, label, sub }) => (
  <div className="text-center px-4">
    <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-1">{value}</div>
    <div className="text-slate-900 font-semibold text-sm">{label}</div>
    {sub && <div className="text-slate-400 text-xs mt-0.5">{sub}</div>}
  </div>
);

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white text-slate-900">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50 via-white to-white pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-6">
            <Badge>Now powered by Google Gemini AI</Badge>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.08] mb-6 tracking-tight">
            Your body speaks.<br />
            <span className="text-teal-600">We translate.</span>
          </h1>

          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe what you feel — by typing, speaking, or snapping a photo. PranixAI reads between the symptoms, delivers a structured health assessment, and points you to the right doctor. All in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to={isAuthenticated ? '/dashboard' : '/register'}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25 active:scale-95 flex items-center justify-center gap-2">
              Start for free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/about"
              className="w-full sm:w-auto border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium px-8 py-4 rounded-xl text-base transition-all duration-200 flex items-center justify-center gap-2">
              See how it works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            {['No credit card required', 'Zero cost, always', '100% browser-based', 'Powered by Gemini AI'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className="border-y border-slate-100 py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-slate-100">
            <StatItem value="3" label="Input modes" sub="Text, Voice, Image" />
            <StatItem value="AI" label="Gemini-powered" sub="Google's best model" />
            <StatItem value="< 3s" label="Assessment time" sub="Instant results" />
            <StatItem value="Free" label="Forever" sub="No hidden charges" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything a clinic visit starts with — <br className="hidden sm:block"/>without the wait
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              PranixAI combines AI intelligence with real-world healthcare navigation in one clean interface.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              tag="Multi-modal"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8"><path d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM8 12h8M12 8v8" strokeLinecap="round"/></svg>}
              title="Three ways to say 'I don't feel good'"
              desc="Type your symptoms, speak them aloud, or upload a photo of a rash, wound, or swelling. PranixAI handles whichever way you're most comfortable."
            />
            <FeatureCard
              tag="AI-powered"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4" strokeLinecap="round"/></svg>}
              title="Diagnosis that actually makes sense"
              desc="Google Gemini AI analyses your input and returns a structured health report — probable condition, severity rating, and home care steps in plain English."
            />
            <FeatureCard
              tag="Real-time"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>}
              title="Your nearest doctor, one tap away"
              desc="Based on the specialist type our AI recommends, we show you matching doctors near your current location on a live interactive map."
            />
            <FeatureCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round"/></svg>}
              title="Book without the phone call"
              desc="Found the right doctor? Book an appointment directly through PranixAI — no calls, no hold music, no repeated explaining."
            />
            <FeatureCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round"/></svg>}
              title="Your health, on record"
              desc="Every symptom check is stored securely in your personal history — timestamped, searchable, and ready to show your doctor."
            />
            <FeatureCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              title="Private by design"
              desc="Your health data belongs to you. It's encrypted, never sold, and never shared with third parties. Your symptoms stay between you and the AI."
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From symptom to doctor in four steps
            </h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">
              No medical jargon. No confusing forms. Just a clear path from "something's off" to "got it handled."
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { step: '01', title: 'Describe your symptoms', body: 'Type, speak, or upload an image. No forms to fill, no checkboxes — just describe what you feel naturally.', color: 'bg-teal-600' },
                { step: '02', title: 'AI analyses instantly', body: 'Gemini processes your input in under 3 seconds. It cross-references symptoms, patterns, and medical knowledge.', color: 'bg-teal-500' },
                { step: '03', title: 'Get your health report', body: 'Receive a structured report: probable condition, severity (Mild / Moderate / Serious), and immediate care advice.', color: 'bg-teal-500' },
                { step: '04', title: 'Connect with care', body: 'Find matching doctors on a live map, see their details, and book an appointment without leaving PranixAI.', color: 'bg-teal-600' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md`}>
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-[15px]">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionLabel>About PranixAI</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
                Built for 1.4 billion people who can't always see a doctor right now
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                India has 1 doctor for every 1,456 patients. That means missed appointments, wrong specialist visits, and hours wasted in waiting rooms for conditions that could have been triaged in seconds.
              </p>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                PranixAI is our answer. A free, AI-powered platform that gives every person — regardless of where they live — instant access to intelligent, preliminary health guidance. Not a replacement for doctors. A smarter way to reach the right one.
              </p>
              <Link to="/about"
                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors group">
                Read our full story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Text Analysis', desc: 'Natural language understanding using Gemini AI' },
                { label: 'Voice Input', desc: 'Real-time speech recognition in your browser' },
                { label: 'Image Analysis', desc: 'Visual symptom detection powered by Gemini Vision' },
                { label: 'Live Map', desc: 'Nearby doctors via OpenStreetMap + Geolocation' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="font-semibold text-slate-900 text-sm mb-1">{item.label}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>What people say</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Early users, real experiences
            </h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">
              These are the voices behind why PranixAI exists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TestimonialCard
              quote="I uploaded a photo of a skin rash and got a Dermatologist recommendation in seconds. Found a clinic nearby and booked the same day. Wild."
              name="Priya Sharma"
              role="Software Engineer, Bengaluru"
              avatar="P"
            />
            <TestimonialCard
              quote="The voice mode is what got me. I was tired and didn't want to type. Just spoke my symptoms and the AI gave me a full breakdown. Genuinely impressed."
              name="Rohan Verma"
              role="Graduate Student, Delhi"
              avatar="R"
            />
            <TestimonialCard
              quote="I live in a small town. The nearest good hospital is 40km away. PranixAI told me my symptoms were Mild and manageable at home. Saved me a whole trip."
              name="Anjali Mishra"
              role="Teacher, Lucknow"
              avatar="A"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Answering the obvious questions
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                q: 'Is PranixAI a replacement for a real doctor?',
                a: "No — and we're proud of that distinction. PranixAI is a preliminary intelligence layer, not a diagnostic authority. It helps you understand your symptoms, assess urgency, and find the right specialist. A qualified doctor always makes the final call."
              },
              {
                q: 'How accurate is the AI health assessment?',
                a: "PranixAI is powered by Google Gemini, one of the most advanced AI models available. It provides research-grade preliminary assessments based on your symptom patterns. That said, AI analysis is always probabilistic — always consult a licensed physician for confirmed diagnosis."
              },
              {
                q: 'Is my health data safe?',
                a: "Your data is encrypted and stored securely in your personal account. We do not sell, share, or transmit your health data to any third party. Your symptom history is visible only to you."
              },
              {
                q: 'Does voice input work on all browsers?',
                a: "Voice input uses the Web Speech API, which is fully supported on Chrome and Microsoft Edge. Firefox and Safari have limited support. We recommend Chrome for the best voice experience."
              },
              {
                q: 'What kind of images can I upload?',
                a: "You can upload photos of visible physical symptoms — skin rashes, wounds, swellings, eye redness, or any externally visible condition. The AI uses Google Gemini Vision to analyse the image. Max file size is 5MB (JPG or PNG)."
              },
              {
                q: 'Is PranixAI really free?',
                a: "Yes — completely free. No credit card, no premium tier, no ads. PranixAI is a student-built project developed to solve a real healthcare accessibility problem. We believe preliminary health guidance should be a right, not a subscription."
              },
              {
                q: 'How do I book a doctor appointment?',
                a: "After your AI assessment, click 'Find Nearby Doctors'. PranixAI uses your location to show relevant healthcare providers on a map. Select any doctor and click 'Book Appointment' — fill in the form and it's done."
              },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / FEEDBACK ───────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Feedback & Contact</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Tell us what you think
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            PranixAI is actively evolving. Your feedback shapes what gets built next.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-teal-500/25 active:scale-95">
            Share your feedback
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <section className="py-20 px-4 bg-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your symptoms have been waiting long enough
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Join PranixAI free. No waiting rooms. No paperwork. Just answers.
          </p>
          <Link to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-teal-700 font-bold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-xl active:scale-95">
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started — It\'s Free'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;