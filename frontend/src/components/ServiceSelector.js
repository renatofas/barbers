import React from 'react';
import './ServiceSelector.css'; // Estilos opcionales

const services = [
  {
    name: 'Corte de cabello ADULTO',
    duration: '1h',
    minutes: 60,
    price: '$20.000',
    image: '/images/adulto.jpg',
  },
  {
    name: 'Corte de cabello más Barba',
    duration: '1h 20min',
    minutes: 80,
    price: '$30.000',
    image: '/images/barba.jpg',
  },
  {
    name: 'Corte de cabello más Asesoría VISAGISTA',
    duration: '1h 35min',
    minutes: 95,
    price: '$50.000',
    image: '/images/visagista.jpg',
  },
  {
    name: 'Corte de cabello NIÑO',
    duration: '1h',
    minutes: 60,
    price: '$20.000',
    image: '/images/nino.jpg',
  },
  {
    name: 'Arreglo de barba',
    duration: '1h',
    minutes: 60,
    price: '$20.000',
    image: '/images/arreglo.jpg',
  },
];

function ServiceSelector({ onSelect }) {
  return (
    <div className="service-container">
      <h2>Selecciona un servicio</h2>
      <div className="service-grid">
        {services.map(service => (
          <div
            key={service.name}
            className="service-card"
            onClick={() => onSelect(service)} // ✅ Aquí pasamos el objeto completo
          >
            <img src={service.image} alt={service.name} />
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.duration} · {service.price}</p>
            </div>
            <div className="arrow">{'>'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceSelector;
