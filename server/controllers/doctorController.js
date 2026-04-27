import Appointment from '../models/Appointment.js';

export const getNearbyDoctors = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: 'Location coordinates required'
      });
    }

    const radius = 25000;

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        node["amenity"="clinic"](around:${radius},${lat},${lng});
         node["amenity"="doctors"](around:${radius},${lat},${lng});
        node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        node["amenity"="dentist"](around:${radius},${lat},${lng});
        node["healthcare"](around:${radius},${lat},${lng});

       way["amenity"="hospital"](around:${radius},${lat},${lng});
       way["amenity"="clinic"](around:${radius},${lat},${lng});
        way["amenity"="pharmacy"](around:${radius},${lat},${lng});
         way["amenity"="dentist"](around:${radius},${lat},${lng});
        way["healthcare"](around:${radius},${lat},${lng});
      );
      out center;
    `;

    const response = await fetch(
      'https://overpass-api.de/api/interpreter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'User-Agent': 'PranixAI/1.0'
        },
        body: query
      }
    );

    if (!response.ok) {
      throw new Error('OpenStreetMap query failed');
    }

    const data = await response.json();

    const doctors = data.elements
      .filter(el => el.lat || el.center?.lat)
      .map((el, index) => ({
        id: el.id || index,
        name:
          el.tags?.name ||
          el.tags?.['name:en'] ||
          `Medical Facility ${index + 1}`,

        address:
          [
            el.tags?.['addr:housenumber'],
            el.tags?.['addr:street'],
            el.tags?.['addr:city']
          ]
            .filter(Boolean)
            .join(', ') || 'Address not available',

        type:
          el.tags?.amenity ||
          'hospital',

        phone:
          el.tags?.phone ||
          el.tags?.['contact:phone'] ||
          null,

        lat: el.lat || el.center?.lat,
        lng: el.lon || el.center?.lon,

        website:
          el.tags?.website || null
      }))
      .slice(0, 15);

    res.json({
      doctors,
      total: doctors.length
    });

  } catch (error) {
    console.error('Doctor search error:', error);

    res.status(500).json({
      message: 'Failed to fetch nearby doctors',
      error: error.message
    });
  }
};



export const bookAppointment = async (req, res) => {
  try {
    const {
      patientName,
      doctorName,
      doctorAddress,
      doctorType,
      date,
      time,
      reason
    } = req.body;

    if (!patientName || !doctorName || !date || !time) {
      return res.status(400).json({
        message: 'Name, doctor, date and time are required'
      });
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

    res.status(201).json({
      success: true,
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: 'Booking failed'
    });
  }
};



export const getBookings = async (req, res) => {
  try {
    const bookings = await Appointment.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json({ bookings });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch bookings'
    });
  }
};