const express = require('express');
const router = express.Router();
const { scheduleAppointment, listAppointments } = require('../controllers/appointmentController');

router.post('/', scheduleAppointment);
router.get('/', listAppointments);

module.exports = router;
