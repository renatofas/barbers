const express = require('express');
const router = express.Router();
const { saveHaircut } = require('../controllers/haircutController');

router.post('/', saveHaircut); // <--- ESTA línea debe existir y tener handler correcto

module.exports = router;
