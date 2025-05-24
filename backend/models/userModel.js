const mongoose = require('./mongo'); // Este archivo configura la conexión con MongoDB

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Busca usuario por email
async function findUserByEmail(email) {
  return await User.findOne({ email });
}

// Crea un nuevo usuario
async function createUser(name, email, phone) {
  const newUser = new User({ name, email, phone });
  await newUser.save();
  return newUser._id;
}

module.exports = { findUserByEmail, createUser };
