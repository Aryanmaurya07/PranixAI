import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import MapView from '../components/MapView';
import DoctorCard from '../components/DoctorCard';
import BookingModal from '../components/BookingModal';

const NearbyDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState(null);
  const navigate = useNavigate();

  const result = JSON.parse(localStorage.getItem('pranix_last_result') || '{}');
  const doctorType = result.doctorType || 'General Physician';

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserLocation({ lat, lng });
        try {
          const { data } = await api.get(`/api/doctors/nearby?lat=${lat}&lng=${lng}&type=${encodeURIComponent(doctorType)}`);
          setDoctors(data.doctors || []);
        } catch {
          setError('Could not fetch nearby doctors. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied. Please allow location access and try again.');
        setLoading(false);
      }
    );
  }, []);

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleBookingSuccess = () => {
    setShowModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">

      {/* Header strip */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Doctors near you</h1>
            <p className="text-sm text-slate-500">
              Showing results for <span className="font-medium text-teal-600">{doctorType}</span>
              {doctors.length > 0 && ` · ${doctors.length} found`}
            </p>
          </div>
          <button onClick={() => navigate('/results')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to results
          </button>
        </div>
      </div>

      {bookingSuccess && (
        <div className="bg-teal-600 text-white text-center py-3 px-4 text-sm font-medium flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Appointment booked successfully! Check your bookings in the dashboard.
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-slate-700 font-semibold">Finding doctors near you</p>
            <p className="text-slate-400 text-sm mt-1">Accessing your location...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center max-w-sm shadow-sm">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Location Error</h3>
            <p className="text-slate-500 text-sm mb-5">{error}</p>
            <button onClick={() => window.location.reload()}
              className="bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm">
              Try again
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)]">

          {/* Map */}
          <div className="flex-1 min-h-[350px] lg:min-h-0">
            {userLocation && (
              <MapView
                userLocation={userLocation}
                doctors={doctors}
                activeDoctor={activeDoctor}
                onDoctorClick={(d) => { setActiveDoctor(d); setSelectedDoctor(d); }}
                onBook={handleBook}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 overflow-y-auto">
            <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <p className="text-sm font-semibold text-slate-700">
                {doctors.length > 0 ? `${doctors.length} facilities found within 5km` : 'No facilities found nearby'}
              </p>
            </div>

            {doctors.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-700 mb-1">No results found</p>
                <p className="text-slate-400 text-sm">Try expanding the search radius or check a different location.</p>
              </div>
            ) : (
              <div className="p-3 flex flex-col gap-3">
                {doctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    doctor={doc}
                    active={activeDoctor?.id === doc.id}
                    onSelect={() => setActiveDoctor(doc)}
                    onBook={() => handleBook(doc)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setShowModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default NearbyDoctors;