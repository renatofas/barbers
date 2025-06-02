
import React from 'react';
import './TeamCard.css';

const TeamCard = () => {
  return (
    <div className="team-card-box">
      <h2>Equipo</h2>
      <div className="team-profile">
        <img
          src="https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748821980/Captura_de_pantalla_2025-06-01_195235_trslwk.png"
          alt="Barbero Cancino"
        />
        <div className="team-info">
          <h3>Barberocancino</h3>
          <p>Barbero profesional especializado en visagismo y cortes modernos. Más de 10 años de experiencia.</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
