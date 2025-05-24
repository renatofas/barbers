const mongoose = require('./mongo');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: false } });

const Review = mongoose.model('Review', reviewSchema);

// Obtener todas las reseñas, ordenadas por creación descendente
async function getAllReviews() {
  return await Review.find().sort({ createdAt: -1 });
}

// Crear una nueva reseña
async function createReview(name, email, rating, message) {
  const review = new Review({ name, email, rating, message });
  await review.save();
  return review._id;
}

module.exports = {
  getAllReviews,
  createReview
};
