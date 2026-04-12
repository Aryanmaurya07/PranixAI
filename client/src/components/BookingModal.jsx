import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const BookingModal = ({ doctor, onClose, onSuccess }) => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    patientName: user?.name || '',
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const result = JSON.parse(localStorage.getItem('pranix_last_result') || '{}');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      setError('Please select a date and time.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/doctors/book', {
        patientName: form.patientName,
        doctorName: doctor.name,
        doctorAddress: doctor.address,
        doctorType: doctor.type,
        date: form.date,
        time: form.time,
        reason: form.reason || result.condition || 'General consultation'
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Book appointment</h2>
            <p className="text-slate-500 text-sm mt-0.5 truncate max-w-[240px]">{doctor.name}</p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Doctor summary */}
        <div className="px-6 py-4 bg-teal-50 border-b border-teal-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-900">{doctor.name}</p>
            <p className="text-xs text-teal-600">{doctor.address}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Patient name</label>
            <input type="text" name="patientName" value={form.patientName} onChange={handleChange} required
              className="w-full border border-slate-200 bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                min={today} required
                className="w-full border border-slate-200 bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} required
                className="w-full border border-slate-200 bg-slate-50 text-slate-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reason for visit</label>
            <textarea name="reason" value={form.reason} onChange={handleChange} rows={2}
              placeholder={result.condition || 'Describe the reason for your visit...'}
              className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all resize-none" />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] text-sm flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Booking...</>
              ) : 'Confirm booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;