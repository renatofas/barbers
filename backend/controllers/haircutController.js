const { findUserByRUT } = require('../models/userModel');
const { registerHaircut, getHaircutsByRUT } = require('../models/haircutModel');

async function uploadHaircut(req, res) {
  const { rut, imageUrl, description, dateTime } = req.body;
  try {
    const user = await findUserByRUT(rut);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const haircutId = await registerHaircut(user.id, imageUrl, description, dateTime);
    res.status(201).json({ message: 'Corte registrado', haircutId });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar corte', error: err.message });
  }
}

async function listHaircuts(req, res) {
  const { rut } = req.params;
  try {
    const cuts = await getHaircutsByRUT(rut);
    res.json(cuts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cortes', error: err.message });
  }
}

module.exports = { uploadHaircut, listHaircuts };
