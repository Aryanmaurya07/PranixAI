import { useEffect, useRef } from 'react';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userIcon = L.divIcon({
  className: '',
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#0d9488;border:3px solid white;box-shadow:0 2px 8px rgba(13,148,136,0.5)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const doctorIcon = (active) => L.divIcon({
  className: '',
  html: `<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${active ? '#0d9488' : '#334155'};border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2)"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const MapView = ({ userLocation, doctors, activeDoctor, onDoctorClick, onBook }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: [userLocation.lat, userLocation.lng],
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<div style="font-weight:600;color:#0d9488">Your location</div>');

    doctors.forEach(doc => {
      const marker = L.marker([doc.lat, doc.lng], { icon: doctorIcon(false) })
        .addTo(map)
        .bindPopup(`
          <div style="min-width:180px">
            <div style="font-weight:700;font-size:13px;margin-bottom:4px">${doc.name}</div>
            <div style="color:#64748b;font-size:11px;margin-bottom:8px">${doc.address}</div>
            <button onclick="window.pranixBook(${doc.id})"
              style="background:#0d9488;color:white;border:none;padding:5px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;width:100%">
              Book Appointment
            </button>
          </div>
        `);
      marker.on('click', () => onDoctorClick(doc));
      markersRef.current[doc.id] = marker;
    });

    window.pranixBook = (id) => {
      const doc = doctors.find(d => d.id === id);
      if (doc) onBook(doc);
    };

    mapInstanceRef.current = map;
    return () => { map.remove(); mapInstanceRef.current = null; };
  }, []);

  useEffect(() => {
    if (!activeDoctor || !mapInstanceRef.current) return;
    const marker = markersRef.current[activeDoctor.id];
    if (marker) {
      mapInstanceRef.current.setView([activeDoctor.lat, activeDoctor.lng], 16, { animate: true });
      marker.openPopup();
    }
  }, [activeDoctor]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '350px' }} />;
};

export default MapView;