
import React, { useState } from 'react';
import './PolicyBanner.css';

const PolicyBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="policy-banner">
      <div className="policy-content">
        <strong>Nuestra política de reservas</strong>
        <p>
          Hola, Bienvenidos a la agenda. La dirección donde estoy atendiendo es <strong>MANUEL AGUILAR 01151</strong>
        </p>
        <div className="policy-sub">
          <strong>Política de cancelación:</strong> Puedes cancelar o reprogramar hasta 24 horas antes de la hora de la cita.
        </div>
      </div>
      <button className="policy-close" onClick={() => setVisible(false)}>De acuerdo</button>
    </div>
  );
};

export default PolicyBanner;
