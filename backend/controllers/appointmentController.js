const { createAppointment, getAppointments } = require('../models/appointmentModel');
const { findUserByRUT } = require('../models/userModel');

async function scheduleAppointment(req, res) {
  const { rut, dateTime, cutOption } = req.body;
  try {
    const user = await findUserByRUT(rut);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const appointmentId = await createAppointment(user.id, dateTime, cutOption);
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
