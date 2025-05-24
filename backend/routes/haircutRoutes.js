const express = require('express');
const router = express.Router();
const {
  saveHaircut,
  getHaircutsByEmail
} = require('../controllers/haircutController');

// Guardar nuevo corte
router.post('/', saveHaircut);

// Obtener historial de cortes por email
router.get('/:email', getHaircutsByEmail);

module.exports = router;
