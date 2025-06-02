
const { getAllReviews, createReview } = require('../models/reviewModel');

const listReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (err) {
    console.error('Error al obtener reseñas:', err);
    res.status(500).json({ message: 'Error al obtener reseñas' });
  }
};

const submitReview = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    console.log('Datos recibidos:', { name, email, rating, message });

    if (!name || !email || !rating || !message) {
      console.log('Campos faltantes');
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    await createReview(name, email, rating, message);
    console.log('Reseña guardada');
    res.status(201).json({ message: 'Reseña registrada' });
  } catch (err) {
    console.error('Error al guardar reseña:', err);
    res.status(500).json({ message: 'Ya existe una reseña con este correo.' });
  }
};


module.exports = {
  listReviews,
  submitReview
};
