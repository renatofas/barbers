const mongoose = require('./mongo');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  cutOption: { type: String, required: true }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Crea una nueva cita
async function createAppointment(userId, dateTime, cutOption) {
  const appointment = new Appointment({ userId, dateTime, cutOption });
  await appointment.save();
  return appointment._id;
}

// Obtiene todas las citas con info del usuario
async function getAppointments() {
  return await Appointment.find()
    .populate('userId', 'name email') // Une con la colección users y trae name y email
    .sort({ dateTime: 1 });
}

module.exports = {
  createAppointment,
  getAppointments
};
