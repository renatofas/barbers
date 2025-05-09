const express = require('express');
const router = express.Router();
const { scheduleAppointment, listAppointments } = require('../controllers/appointmentController');

// POST /api/appointments → agendar cita
router.post('/', scheduleAppointment);

// GET /api/appointments → listar citas
router.get('/', listAppointments);

module.exports = router;
