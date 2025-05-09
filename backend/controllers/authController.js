const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByRUT, createUser } = require('../models/userModel');

async function register(req, res) {
  const { name, email, rut, password } = req.body;
  try {
    const existingUser = await findUserByRUT(rut);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, rut, passwordHash);
    res.status(201).json({ message: 'Usuario registrado', userId });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
}

async function login(req, res) {
  const { rut, password } = req.body;
  try {
    const user = await findUserByRUT(rut);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, rut: user.rut }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login', error: err.message });
  }
}

module.exports = { register, login };
