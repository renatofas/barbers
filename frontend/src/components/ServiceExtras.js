
import React, { useState } from 'react';
import './ServiceExtras.css';
import ReviewModal from './ReviewModal';
import ReviewList from './ReviewList';

function ServiceExtras() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSubmitted = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="extras-container">
      {showModal && <ReviewModal onClose={() => setShowModal(false)} onSubmitted={handleSubmitted} />}

      <section className="team-section">
        <h3>Equipo</h3>
        <div className="team-card">
          <img src="/images/barbero.jpg" alt="Barbero" />
          <span>Barberocancino</span>
          <span className="arrow">{'>'}</span>
        </div>
      </section>

      <section className="contact-section">
        <h3>Ponte en contacto con nosotros</h3>
        <p>📞 <a href="tel:+56943403959">+56 9 4340 3959</a></p>
      </section>

      <section className="policy-section">
        <h3>Bueno saber</h3>
        <p>📄 <a href="#">Política de reservas</a></p>
      </section>

      <section className="reviews-section">
        <h3>Reseñas</h3>
        <div className="stars-summary">
          <div className="rating-score">
            <strong>5.0</strong>
            <div>★★★★★</div>
            <div>7 reseñas</div>
            <button onClick={() => setShowModal(true)}>Escribe una reseña</button>
          </div>
        </div>
        <ReviewList key={refresh} />
      </section>
    </div>
  );
}

export default ServiceExtras;
