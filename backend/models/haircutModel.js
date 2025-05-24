const mongoose = require('./mongo');

const haircutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image_base64: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Haircut = mongoose.model('Haircut', haircutSchema);

// Guardar un nuevo corte
async function saveHaircut(userId, image, description) {
  const haircut = new Haircut({ userId, image_base64: image, description });
  await haircut.save();
  return haircut._id;
}

module.exports = {
  saveHaircut
};
