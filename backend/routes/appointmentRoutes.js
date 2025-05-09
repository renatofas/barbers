const express = require('express');
const { scheduleAppointment, listAppointments } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', scheduleAppointment);
router.get('/', listAppointments);

module.exports = router;
