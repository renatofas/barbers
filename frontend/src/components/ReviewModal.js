
import React, { useState } from 'react';
import './ReviewModal.css';
import { FaStar } from 'react-icons/fa';

const ReviewModal = ({ onClose, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (rating === 0 || name.trim() === '' || email.trim() === '') {
      setError('Por favor completa todos los campos y deja un comentario válido.');
      return;
    }

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, rating, message: comment })
    });

    if (response.ok) {
      onReviewSubmitted();
      onClose();
    } else {
      setError('Hubo un problema al enviar la reseña.');
    }
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h2>Escribe una reseña</h2>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`star ${star <= (hover || rating) ? 'active' : ''}`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Escribe tu opinión..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {error && <p className="error">{error}</p>}

        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Enviar reseña</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
