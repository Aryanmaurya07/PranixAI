import { useState, useRef } from 'react';

const ImageUpload = ({ value, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(',')[1];
      onChange({ base64, mimeType: file.type, preview: dataUrl, name: file.name, size: file.size });
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const formatSize = (bytes) => bytes > 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    : (bytes / 1024).toFixed(0) + ' KB';

  return (
    <div>
      {!value ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
            dragging
              ? 'border-teal-500 bg-teal-50'
              : 'border-slate-300 bg-slate-50 hover:border-teal-400 hover:bg-teal-50/50'
          }`}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => processFile(e.target.files[0])}
          />
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dragging ? '#0d9488' : '#94a3b8'} strokeWidth="1.8">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
            </svg>
          </div>
          <p className={`font-semibold mb-1 transition-colors ${dragging ? 'text-teal-700' : 'text-slate-700'}`}>
            {dragging ? 'Drop to upload' : 'Upload a photo'}
          </p>
          <p className="text-slate-400 text-sm mb-3">Drag & drop or click to browse</p>
          <p className="text-xs text-slate-400">JPG, PNG, WebP · Max 5MB</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
          <div className="relative">
            <img src={value.preview} alt="Symptom"
              className="w-full max-h-72 object-contain bg-slate-50" />
            <button
              onClick={() => onChange(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 shadow-sm transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{value.name}</p>
                <p className="text-xs text-slate-400">{formatSize(value.size)}</p>
              </div>
              <div className="flex items-center gap-1 text-teal-600 text-xs font-semibold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ready
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-blue-700 mb-1.5">Tips for better analysis</p>
        <ul className="text-xs text-blue-600 space-y-1">
          <li>· Use good lighting — avoid dark or blurry photos</li>
          <li>· Show the affected area clearly and up close</li>
          <li>· Works best for: rashes, skin conditions, wounds, eye redness, swelling</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;