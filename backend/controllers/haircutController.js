const db = require('../models/db');

async function saveHaircut(req, res) {
  const { email, image, description } = req.body;

  console.log('📩 Datos recibidos:', {
    email,
    imageLength: image ? image.length : 0,
    description,
  });

  try {
    const [userRow] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    console.log('👤 Resultado búsqueda de usuario:', userRow);

    if (!userRow.length) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userId = userRow[0].id;

    await db.query(
      'INSERT INTO haircuts (user_id, image_base64, description, created_at) VALUES (?, ?, ?, NOW())',
      [userId, image, description]
    );

    console.log('✅ Corte guardado correctamente');
    res.status(201).json({ message: 'Corte guardado exitosamente' });
  } catch (err) {
    console.error('❌ Error en saveHaircut:', err.message);
    res.status(500).json({ message: 'Error al guardar corte', error: err.message });
  }
}

module.exports = { saveHaircut };
