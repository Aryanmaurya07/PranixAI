import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', type: 'feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-teal-200 mb-4">
            Contact
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get in touch</h1>
          <p className="text-slate-500 text-lg">
            Feedback, bug reports, feature requests, or just want to say hi — we read everything.
          </p>
        </div>

        {submitted ? (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Message received!</h2>
            <p className="text-slate-500 text-sm">Thanks for reaching out. We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Aryan Maurya"
                    className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="you@example.com"
                    className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type of message</label>
                <select name="type" value={form.type} onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors">
                  <option value="feedback">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-colors resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                ) : 'Send message'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;