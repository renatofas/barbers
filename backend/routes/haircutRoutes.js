const express = require('express');
const { uploadHaircut, listHaircuts } = require('../controllers/haircutController');

const router = express.Router();

router.post('/', uploadHaircut);
router.get('/:rut', listHaircuts);

module.exports = router;
