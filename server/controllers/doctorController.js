import Appointment from '../models/Appointment.js';

export const getNearbyDoctors = async (req, res) => {
  try {
    const { lat, lng, type } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Location coordinates required' });
    }

    const radius = 5000;
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="clinic"](around:${radius},${lat},${lng});
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        node["amenity"="doctors"](around:${radius},${lat},${lng});
        node["healthcare"="clinic"](around:${radius},${lat},${lng});
        node["healthcare"="hospital"](around:${radius},${lat},${lng});
        way["amenity"="clinic"](around:${radius},${lat},${lng});
        way["amenity"="hospital"](around:${radius},${lat},${lng});
      );
      out center 30;
    `;

    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('OpenStreetMap query failed');
    }

    const data = await response.json();

    const doctors = data.elements
      .filter(el => el.lat || el.center?.lat)
      .map((el, index) => ({
        id: el.id || index,
        name: el.tags?.name || el.tags?.['name:en'] || `Medical Facility ${index + 1}`,
        address: [
          el.tags?.['addr:houseno'],
          el.tags?.['addr:street'],
          el.tags?.['addr:city']
        ].filter(Boolean).join(', ') || 'Address not available',
        type: el.tags?.healthcare || el.tags?.amenity || 'clinic',
        phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
        lat: el.lat || el.center?.lat,
        lng: el.lon || el.center?.lon,
        opening_hours: el.tags?.opening_hours || null,
        website: el.tags?.website || null,
      }))
      .filter(d => d.lat && d.lng)
      .slice(0, 15);

    res.json({ doctors, total: doctors.length });

  } catch (error) {
    console.error('Doctor search error:', error);
    res.status(500).json({ message: 'Failed to fetch nearby doctors', error: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { patientName, doctorName, doctorAddress, doctorType, date, time, reason } = req.body;

    if (!patientName || !doctorName || !date || !time) {
      return res.status(400).json({ message: 'Name, doctor, date and time are required' });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      patientName,
      doctorName,
      doctorAddress,
      doctorType,
      date,
      time,
      reason
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed' });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Appointment.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};