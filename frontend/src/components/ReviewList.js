
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/api/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error cargando reseñas:', err));
  }, []);

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p>No hay reseñas aún.</p>
      ) : (
        reviews.map((r, idx) => (
          <div className="review" key={idx}>
            <strong>{r.name}</strong> <span>{'★'.repeat(r.rating)}</span>
            <p>{r.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
