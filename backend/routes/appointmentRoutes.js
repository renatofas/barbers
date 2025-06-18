const express = require('express');
const router = express.Router();
const {
  scheduleAppointment,
  listAppointments,
  updateAppointment
} = require('../controllers/appointmentController');

router.post('/', scheduleAppointment);
router.get('/', listAppointments);
router.put('/:id', updateAppointment); // NUEVO: editar desde app

module.exports = router;
