
const db = require('./db');

// Obtener todas las reseñas
async function getAllReviews() {
  const [rows] = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
  return rows;
}

// Crear una nueva reseña
async function createReview(name, email, rating, message) {
  const [result] = await db.query(
    'INSERT INTO reviews (name, email, rating, message) VALUES (?, ?, ?, ?)',
    [name, email, rating, message]
  );
  return result.insertId;
}

module.exports = {
  getAllReviews,
  createReview
};
