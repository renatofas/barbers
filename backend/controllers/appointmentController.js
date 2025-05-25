
const { findUserByEmail } = require('../models/userModel');
const { Appointment, createAppointment, getAppointments } = require('../models/appointmentModel');

const scheduleAppointment = async (req, res) => {
  try {
    const { email, dateTime, cut_option, durationHours } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const hoursToBlock = parseInt(durationHours) || 1;
    const baseDate = new Date(dateTime);
    const minutes = baseDate.getMinutes();
    const timeSlots = [];

    for (let i = 0; i < hoursToBlock; i++) {
      const slot = new Date(baseDate);
      slot.setHours(slot.getHours() + i);
      timeSlots.push(slot);
    }

    const overlapping = await Appointment.findOne({
      dateTime: { $in: timeSlots.map(dt => new Date(dt)) }
    });

    if (overlapping) {
      return res.status(409).json({ message: 'Ese horario ya está ocupado' });
    }

    for (let i = 0; i < hoursToBlock; i++) {
      const slot = new Date(baseDate);
      slot.setHours(slot.getHours() + i);
      await createAppointment(user.id, slot, i === 0 ? cut_option : `${cut_option} (bloqueo)`);
    }

    res.status(201).json({ message: 'Cita agendada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al agendar cita' });
  }
};

const listAppointments = async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener citas' });
  }
};

module.exports = { scheduleAppointment, listAppointments };
