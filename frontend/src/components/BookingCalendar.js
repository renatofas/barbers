import React, { useState, useEffect } from 'react';
import axios from 'axios';

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00'
];

function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!selectedDate) return;
      try {
        const res = await axios.get('http://localhost:3001/api/appointments');
        const times = res.data
          .filter(a => a.date_time.startsWith(selectedDate))
          .map(a => a.date_time.split('T')[1].slice(0, 5));
        setBookedTimes(times);
      } catch (err) {
        console.error('Error al obtener citas', err);
      }
    };
    fetchBookedTimes();
  }, [selectedDate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return alert('Selecciona fecha y hora');
    try {
      const userRes = await axios.post('http://localhost:3001/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone
      });
      await axios.post('http://localhost:3001/api/appointments', {
        email: form.email,
        dateTime: `${selectedDate}T${selectedTime}`,
        cutOption: 'Sin especificar'
      });
      alert('Cita agendada con éxito');
      setSelectedTime('');
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      alert('Error al agendar cita');
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const isToday = selectedDate === today;

  const availableSlots = availableTimes.filter(time => {
    if (bookedTimes.includes(time)) return false;
    if (isToday) {
      const slotTime = new Date(`${selectedDate}T${time}`);
      return slotTime.getTime() > now.getTime();
    }
    return true;
  });

  return (
    <div>
      <h2>Agendar Corte de Pelo</h2>
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
              style={{ margin: '5px', backgroundColor: selectedTime === time ? '#ccc' : '' }}
            >
              {time}
            </button>
          )) : <p>No hay horas disponibles</p>}
        </div>
      )}
      {selectedTime && (
        <form onSubmit={handleSubmit}>
          <h4>Formulario:</h4>
          <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input type="email" name="email" placeholder="Correo" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input type="tel" name="phone" placeholder="Teléfono" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <button type="submit">Agendar</button>
        </form>
      )}
    </div>
  );
}

export default BookingCalendar;
