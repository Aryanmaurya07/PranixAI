const DoctorCard = ({ doctor, active, onSelect, onBook }) => (
  <div
    onClick={onSelect}
    className={`rounded-2xl border p-4 cursor-pointer transition-all duration-200 ${
      active
        ? 'border-teal-500 bg-teal-50 shadow-sm shadow-teal-500/10'
        : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm'
    }`}>
    <div className="flex items-start gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
        active ? 'bg-teal-600' : 'bg-slate-100'
      }`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'white' : '#64748b'} strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 text-sm leading-snug mb-0.5">{doctor.name}</p>
        <p className="text-slate-400 text-xs leading-relaxed truncate">{doctor.address}</p>
      </div>
    </div>

    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-lg capitalize">
        {doctor.type}
      </span>
      {doctor.opening_hours && (
        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">
          Open
        </span>
      )}
      {doctor.phone && (
        <a href={`tel:${doctor.phone}`} onClick={e => e.stopPropagation()}
          className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors">
          Call
        </a>
      )}
    </div>

    <button
      onClick={(e) => { e.stopPropagation(); onBook(); }}
      className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:shadow-md hover:shadow-teal-500/20 active:scale-[0.98]">
      Book Appointment
    </button>
  </div>
);

export default DoctorCard;