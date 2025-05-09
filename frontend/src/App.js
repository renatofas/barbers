import React, { useState } from 'react';
import ServiceSelector from './components/ServiceSelector';
import BookingCalendar from './components/BookingCalendar';
import './styles.css';

function App() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="container">
      {!selectedService ? (
        <ServiceSelector onSelect={(service) => {
          console.log('🟢 Servicio seleccionado desde ServiceSelector:', service);
          setSelectedService(service);
        }} />
      ) : (
        <BookingCalendar
          selectedService={selectedService}
          goBack={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

export default App;
