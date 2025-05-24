const { findUserByEmail } = require('../models/userModel');
const { saveHaircut } = require('../models/haircutModel');
const Haircut = require('../models/haircutModel'); // Modelo Mongoose

// Guardar un nuevo corte de cabello
async function saveHaircutController(req, res) {
  const { email, image, description } = req.body;

  console.log('📩 Datos recibidos:', {
    email,
    imageLength: image ? image.length : 0,
    description,
  });

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await saveHaircut(user._id, image, description);
    console.log('✅ Corte guardado correctamente');
    res.status(201).json({ message: 'Corte guardado exitosamente' });
  } catch (err) {
    console.error('❌ Error en saveHaircut:', err.message);
    res.status(500).json({ message: 'Error al guardar corte', error: err.message });
  }
}

// Obtener historial de cortes por email
async function getHaircutsByEmail(req, res) {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const cuts = await Haircut.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(cuts);
  } catch (err) {
    console.error('❌ Error al obtener historial:', err);
    res.status(500).json({ message: 'Error al obtener historial' });
  }
}

module.exports = {
  saveHaircut: saveHaircutController,
  getHaircutsByEmail
};
