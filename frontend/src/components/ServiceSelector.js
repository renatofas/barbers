
import React from 'react';
import './ServiceSelector.css'; // Usa el nuevo estilo similar a Setmore

const services = [
  {
    name: 'Corte de cabello ADULTO',
    duration: '1h',
    minutes: 60,
    durationHours: 1,
    price: '$20.000',
    image: 'https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748206798/f29d6f4b-ad0cc940-fd5885d-1868d459-841e7c64-4e5d1a9a_srzeyw.webp',
  },
  {
    name: 'Corte de cabello más Barba',
    duration: '1h 20min',
    minutes: 80,
    durationHours: 2,
    price: '$30.000',
    image: 'https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748206861/ffd537fd-47249dbc-cae350e3-bc0b2303-d7019d5f-44dc1605_ou2cgl.webp',
  },
  {
    name: 'Corte de cabello más Asesoría VISAGISTA',
    duration: '1h 35min',
    minutes: 95,
    durationHours: 2,
    price: '$50.000',
    image: 'https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748206863/f65a1a7e-8915dbb2-5f356d1b-19405394-49c2b801-4ebad476_e6x74f.webp',
  },
  {
    name: 'Corte de cabello NIÑO',
    duration: '1h',
    minutes: 60,
    durationHours: 1,
    price: '$20.000',
    image: 'https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748206863/38d578dd-fd2a53b9-e4b43500-d6f2095c-82045a97-4a2a5c05_tfegpp.webp',
  },
  {
    name: 'Arreglo de barba',
    duration: '1h',
    minutes: 60,
    durationHours: 1,
    price: '$20.000',
    image: 'https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748206865/d380e953-1c688e0d-bc5b3a5b-3bf81e56-a8041110-4b40f06c_mlevvv.webp',
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
            onClick={() => onSelect(service)}
          >
            <img src={service.image} alt={service.name} />
            <div className="service-info">
              <h3>{service.name}</h3>
              <div className="service-info-details">
                <span>{service.duration}</span>
                <span>·</span>
                <span>Detalles</span>
                <span>·</span>
                <span>{service.price}</span>
              </div>
            </div>
            <div className="arrow">{'>'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceSelector;
