
import React, { useEffect, useState } from 'react';
import ReviewModal from './ReviewModal';
import './ProductReviews.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error al cargar reseñas:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const getAverage = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return (
      <>
        {[...Array(5)].map((_, i) =>
          i < rating ? <FaStar key={i} color="#ffcc00" /> : <FaRegStar key={i} color="#777" />
        )}
      </>
    );
  };

  return (
    <div className="product-reviews">
      <div className="review-header-section">
        <h2>Opiniones de clientes</h2>
        <button className="leave-review-btn" onClick={() => setShowModal(true)}>
          Escribir una reseña
        </button>
      </div>

      <div className="average-rating">
        {renderStars(Math.round(getAverage()))}
        <span className="avg-score">{getAverage()} / 5</span>
        <span className="review-count">({reviews.length} reseñas)</span>
      </div>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            <div className="review-header">
              <strong>{review.name}</strong>
              {renderStars(review.rating)}
            </div>
            <p>{review.message}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <ReviewModal
          onClose={() => setShowModal(false)}
          onReviewSubmitted={fetchReviews}
        />
      )}
    </div>
  );
};

export default ProductReviews;
