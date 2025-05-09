import React, { useState, useEffect } from 'react';
import axios from 'axios';

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

function BookingCalendar({ selectedService, goBack }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bookedHours, setBookedHours] = useState([]);

  const isLongService = selectedService.name.includes('Barba') || selectedService.name.includes('VISAGISTA');

  useEffect(() => {
    const fetchBookedHours = async () => {
      if (!selectedDate) return;

      try {
        const res = await axios.get('http://localhost:3001/api/appointments');
        const sameDay = res.data.filter(a =>
          a.date_time && a.date_time.startsWith(selectedDate)
        );

        const hours = sameDay.map(a =>
          a.date_time.split('T')[1].slice(0, 5) // → "HH:MM"
        );

        setBookedHours(hours);
      } catch (err) {
        console.error('Error al obtener citas:', err);
      }
    };

    fetchBookedHours();
  }, [selectedDate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return alert('Selecciona fecha y hora');

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone
      });

      await axios.post('http://localhost:3001/api/appointments', {
        email: form.email,
        dateTime: `${selectedDate}T${selectedTime}`,
        cut_option: selectedService.name
      });

      alert('Cita agendada con éxito');
      setSelectedTime('');
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      if (err.response?.status === 409) {
        alert('Ese horario ya está ocupado.');
      } else {
        alert('Error al agendar cita');
        console.error(err);
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const isToday = selectedDate === today;

  const availableSlots = availableTimes.filter((time, index) => {
    if (!selectedDate) return false;

    const [hour] = time.split(':').map(Number);

    const timeDate = new Date(`${selectedDate}T${time}`);
    if (isToday && timeDate < now) return false;

    const isTaken = bookedHours.includes(time);

    // Si el servicio es largo, también bloquea la hora anterior
    if (isLongService) {
      const nextHour = `${String(hour + 1).padStart(2, '0')}:00`;
      const prevHour = `${String(hour - 1).padStart(2, '0')}:00`;
      if (bookedHours.includes(prevHour) || bookedHours.includes(time)) return false;
    } else {
      if (isTaken) return false;
    }

    return true;
  });

  return (
    <div>
      <h2>{selectedService.name}</h2>
      <p>{selectedService.duration} · {selectedService.price}</p>

      <input
        type="date"
        value={selectedDate}
        min={today}
        onChange={e => {
          setSelectedDate(e.target.value);
          setSelectedTime('');
        }}
        required
      />

      {selectedDate && (
        <div>
          <h4>Horas disponibles:</h4>
          {availableSlots.length ? availableSlots.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
              style={{
                margin: '5px',
                padding: '10px',
                borderRadius: '6px',
                backgroundColor: selectedTime === time ? '#2196f3' : '#333',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {time}
            </button>
          )) : <p>No hay horas disponibles</p>}
        </div>
      )}

      {selectedTime && (
        <form onSubmit={handleSubmit}>
          <h4>Formulario:</h4>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              marginBottom: '16px',
              backgroundColor: '#2a2a2a',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
          <button type="submit">Agendar</button>
        </form>
      )}

      <button onClick={goBack} style={{ marginTop: '1rem' }}>
        ← Volver
      </button>
    </div>
  );
}

export default BookingCalendar;
