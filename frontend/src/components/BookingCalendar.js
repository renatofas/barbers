import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingCalendar.css';

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

function toAmPm(time24) {
  const [hour, minute] = time24.split(':').map(Number);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${suffix}`;
}

function BookingCalendar({ selectedService, goBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bookedTimes, setBookedTimes] = useState([]);

  const formattedDate = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/appointments');
        const times = res.data
          .filter(a => a.date_time.startsWith(formattedDate))
          .map(a => {
            const date = new Date(a.date_time);
            const h = String(date.getHours()).padStart(2, '0');
            const m = String(date.getMinutes()).padStart(2, '0');
            return `${h}:${m}`;
          });
        setBookedTimes(times);
      } catch (err) {
        console.error('Error al obtener citas', err);
      }
    };

    fetchBookedTimes();
  }, [formattedDate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/register', form);

      await axios.post('http://localhost:3001/api/appointments', {
        email: form.email,
        dateTime: `${formattedDate}T${selectedTime}`,
        cut_option: selectedService.name
      });

      alert('Cita agendada con éxito');
      setSelectedTime('');
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      if (err.response?.status === 409) {
        alert('Ese horario ya está ocupado.');
      } else {
        console.error('Error al agendar cita:', err);
        alert('Error al agendar cita.');
      }
    }
  };

  const today = new Date();
  const isToday = selectedDate.toDateString() === today.toDateString();

  const availableSlots = availableTimes.filter(time => {
    if (bookedTimes.includes(time)) return false;
    if (isToday) {
      const slotTime = new Date(`${formattedDate}T${time}`);
      return slotTime > new Date();
    }
    return true;
  });

  return (
    <div className="booking-layout">
      <div className="calendar-card">
        <div className="top-bar">
          <button onClick={goBack} className="back-button">←</button>
        </div>
        <h2>{selectedService.name}</h2>
        <p>{selectedService.duration} · {selectedService.price}</p>
        <DatePicker
          selected={selectedDate}
          onChange={date => {
            setSelectedDate(date);
            setSelectedTime('');
          }}
          inline
          minDate={new Date()}
        />
        <div className="timezone-label">Zona horaria: Chile – Santiago</div>
      </div>

      <div className="hours-card">
        <div className="hour-section">
          <h4>Horas disponibles</h4>
          <div className="hour-buttons">
            {availableSlots.length > 0 ? availableSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`hour-button ${selectedTime === time ? 'selected' : ''}`}
              >
                {toAmPm(time)}
              </button>
            )) : <p>No hay horas disponibles</p>}
          </div>
        </div>

        {selectedTime && (
          <div className="form-section-wrapper">
            <div className="summary-card">
              <h4>Resumen</h4>
              <p><strong>Servicio:</strong> {selectedService.name}</p>
              <p><strong>Hora:</strong> {toAmPm(selectedTime)}</p>
              <p><strong>Precio:</strong> {selectedService.price}</p>
            </div>

            <form onSubmit={handleSubmit} className="form-section">
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
                placeholder="Correo electrónico"
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
              />
              <button type="submit" className="submit-button">Agendar cita</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCalendar;
