const { findUserByEmail, createUser } = require('../models/userModel');

async function register(req, res) {
  const { name, email, phone } = req.body;
  try {
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(200).json({ message: 'Usuario ya registrado', userId: user.id });
    }
    const userId = await createUser(name, email, phone);
    res.status(201).json({ message: 'Usuario registrado', userId });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
}

module.exports = { register };
