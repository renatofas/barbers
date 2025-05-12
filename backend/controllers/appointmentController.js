
const { findUserByEmail } = require('../models/userModel');
const { createAppointment, getAppointments } = require('../models/appointmentModel');

const scheduleAppointment = async (req, res) => {
  try {
    const { email, dateTime, cut_option, durationHours } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await createAppointment(user.id, dateTime, cut_option);

    // Calcular correctamente las horas siguientes
    const hoursToBlock = parseInt(durationHours) || 1;
    const [datePart, timePart] = dateTime.split('T');
    const [hour, minute] = timePart.split(':');
    const baseHour = parseInt(hour, 10);

    for (let i = 1; i < hoursToBlock; i++) {
      const nextHour = baseHour + i;
      const paddedHour = String(nextHour).padStart(2, '0');
      const nextSlot = `${datePart}T${paddedHour}:${minute}:00`;
      await createAppointment(user.id, nextSlot, `${cut_option} (bloqueo)`);
    }

    res.status(201).json({ message: 'Cita agendada' });
  } catch (err) {
    console.error('Error al agendar cita:', err);
    res.status(500).json({ message: 'Error al agendar cita' });
  }
};

const listAppointments = async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.json(appointments);
  } catch (err) {
    console.error('Error al listar citas:', err);
    res.status(500).json({ message: 'Error al listar citas' });
  }
};

module.exports = {
  scheduleAppointment,
  listAppointments
};
