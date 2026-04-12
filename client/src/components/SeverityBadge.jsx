const config = {
  Mild: {
    bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700',
    dot: 'bg-green-500', icon: '✓', bar: 'w-1/3 bg-green-500'
  },
  Moderate: {
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
    dot: 'bg-amber-500', icon: '!', bar: 'w-2/3 bg-amber-500'
  },
  Serious: {
    bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700',
    dot: 'bg-red-500', icon: '!!', bar: 'w-full bg-red-500'
  }
};

const SeverityBadge = ({ severity, showBar = false }) => {
  const s = severity || 'Mild';
  const c = config[s] || config.Mild;

  return (
    <div className="flex flex-col gap-2">
      <span className={`inline-flex items-center gap-2 ${c.bg} ${c.border} ${c.text} border px-3 py-1.5 rounded-full text-sm font-semibold w-fit`}>
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        {s}
      </span>
      {showBar && (
        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${c.bar}`} />
        </div>
      )}
    </div>
  );
};

export default SeverityBadge;