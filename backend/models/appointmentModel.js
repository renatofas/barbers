
const mongoose = require('./mongo');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  cutOption: { type: String, required: true }
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
