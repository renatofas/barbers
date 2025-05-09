const { createAppointment, getAppointments } = require('../models/appointmentModel');
const { findUserByEmail } = require('../models/userModel');
const db = require('../models/db');

async function scheduleAppointment(req, res) {
  const { email, dateTime, cut_option } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const serviceDurations = {
      'Corte de cabello ADULTO': 60,
      'Corte de cabello más Barba': 80,
      'Corte de cabello más Asesoría VISAGISTA': 95,
      'Corte de cabello NIÑO': 60,
      'Arreglo de barba': 60,
    };

    const appointmentStart = new Date(dateTime);
    const durationMinutes = serviceDurations[cut_option] || 60;
    const appointmentEnd = new Date(appointmentStart.getTime() + durationMinutes * 60000);

    const [conflicts] = await db.query(
      `SELECT * FROM appointments
       WHERE date_time < ?
       AND DATE_ADD(date_time, INTERVAL 
         CASE cut_option
           WHEN 'Corte de cabello ADULTO' THEN 60
           WHEN 'Corte de cabello más Barba' THEN 80
           WHEN 'Corte de cabello más Asesoría VISAGISTA' THEN 95
           WHEN 'Corte de cabello NIÑO' THEN 60
           WHEN 'Arreglo de barba' THEN 60
         ELSE 60
         END MINUTE
       ) > ?`,
      [appointmentEnd, appointmentStart]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ message: 'Ese horario se solapa con otra cita' });
    }

    const appointmentId = await createAppointment(user.id, dateTime, cut_option);
    res.status(201).json({ message: 'Cita agendada', appointmentId });

  } catch (err) {
    res.status(500).json({ message: 'Error al agendar cita', error: err.message });
  }
}

async function listAppointments(req, res) {
  try {
    const appointments = await getAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas', error: err.message });
  }
}

module.exports = { scheduleAppointment, listAppointments };
