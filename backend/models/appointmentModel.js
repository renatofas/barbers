const mongoose = require('./mongo');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  cutOption: { type: String, required: true },
  description: { type: String },                // NUEVO: para app
  fotoPerfilCliente: { type: String }           // NUEVO: para app
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

async function createAppointment(userId, dateTime, cutOption) {
  const appointment = new Appointment({ userId, dateTime, cutOption });
  await appointment.save();
  return appointment._id;
}

async function getAppointments() {
  return Appointment.find().populate('userId');
}

module.exports = {
  Appointment,
  createAppointment,
  getAppointments
};
