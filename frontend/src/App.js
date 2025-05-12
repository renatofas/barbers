
import React, { useState } from 'react';
import ServiceSelector from './components/ServiceSelector';
import BookingCalendar from './components/BookingCalendar';
import ServiceExtras from './components/ServiceExtras';
import './styles.css';

function App() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="App">
      {!selectedService ? (
        <>
          <ServiceSelector onSelect={setSelectedService} />
          <ServiceExtras />
        </>
      ) : (
        <BookingCalendar selectedService={selectedService} goBack={() => setSelectedService(null)} />
      )}
    </div>
  );
}

export default App;
