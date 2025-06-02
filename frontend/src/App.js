
import React, { useState } from 'react';
import ServiceSelector from './components/ServiceSelector';
import BookingCalendar from './components/BookingCalendar';
import './styles.css';
import PolicyModal from './components/PolicyModal';
import ProductReviews from './components/ProductReviews';
import { FiPhone, FiMessageCircle } from 'react-icons/fi';
import PolicyBanner from './components/PolicyBanner';
import TeamCard from './components/TeamCard';

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <div className="app-container">
      {!selectedService ? (
        <>
          <header className="main-header">
            <img
              src="https://res.cloudinary.com/dhvxcx2d2/image/upload/v1748206669/Logo_Vintage_de_Barber%C3%ADa_hqgpg1.png"
              alt="Barbería Logo"
              className="barber-logo"
            />
            <h1><span className="emoji">✂️</span> Selecciona un servicio</h1>
            <PolicyBanner />
          </header>
          <main>
            <ServiceSelector onSelect={setSelectedService} />
    

            <TeamCard />


            <section className="contact-section">
              <h2>Ponte en contacto con nosotros</h2>
              <div className="contact-methods refined">
                <a href="tel:+56943403959" className="contact-link">
                  <FiPhone size={18} />
                  <span>+56 9 4340 3959</span>
                </a>
                <a
                  href="https://wa.me/56943403959"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <FiMessageCircle size={18} />
                  <span>Enviar WhatsApp</span>
                </a>
              </div>
            </section>

            <section className="info-section">
              <h2><span className="icon">ℹ️</span> Bueno saber</h2>
              <a className="policy-link" onClick={() => setShowPolicy(true)}>Política de reservas</a>
            </section>

            <ProductReviews />
          </main>
        {showPolicy && <PolicyModal onClose={() => setShowPolicy(false)} />} 
        </>
      ) : (
        <BookingCalendar selectedService={selectedService} goBack={() => setSelectedService(null)} />
      )}
    </div>
  );
}

export default App;
