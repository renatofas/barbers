
import React from 'react';
import './PolicyModal.css';

const PolicyModal = ({ onClose }) => {
  return (
    <div className="policy-overlay">
      <div className="policy-modal">
        <h2>Nuestra política de reservas</h2>
        <p>
          Hola, Bienvenidos a la agenda. La dirección donde estoy atendiendo es <strong>MANUEL AGUILAR 01151</strong>
        </p>
        <div className="policy-highlight">
          <strong>Política de cancelación:</strong> Puedes cancelar o reprogramar hasta 24 horas antes de la hora de la cita.
        </div>
        <button onClick={onClose}>De acuerdo</button>
      </div>
    </div>
  );
};

export default PolicyModal;
