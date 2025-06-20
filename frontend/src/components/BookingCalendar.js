
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', countryCode: '+56' });
  const [bookedTimes, setBookedTimes] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);

  const serviceDuration = selectedService.durationHours || 1;

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/appointments');
        setAllAppointments(res.data);

        const times = [];
        res.data.forEach(a => {
          const localDate = new Date(a.dateTime);
          if (
            localDate.getFullYear() === selectedDate.getFullYear() &&
            localDate.getMonth() === selectedDate.getMonth() &&
            localDate.getDate() === selectedDate.getDate()
          ) {
            const h = localDate.getHours();
            const m = localDate.getMinutes();
            const start = h + m / 60;
            const duration = a.durationHours || 1;

            for (let i = 0; i < duration; i++) {
              const blockedHour = start + i;
              const hourStr = String(Math.floor(blockedHour)).padStart(2, '0');
              const minuteStr = String(Math.round((blockedHour % 1) * 60)).padStart(2, '0');
              times.push(`${hourStr}:${minuteStr}`);
            }
          }
        });

        setBookedTimes(times);
      } catch (err) {
        console.error('Error al obtener citas', err);
      }
    };

    fetchAllAppointments();
  }, [selectedDate, selectedService]);

  useEffect(() => {
    const today = new Date();
    const bookedCount = bookedTimes.length;

    if (bookedCount === availableTimes.length) {
      let tryDate = new Date(selectedDate);
      for (let i = 1; i <= 30; i++) {
        tryDate.setDate(selectedDate.getDate() + i);

        const appointmentsThatDay = allAppointments.filter(a => {
          const d = new Date(a.dateTime);
          const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
          return (
            local.getFullYear() === tryDate.getFullYear() &&
            local.getMonth() === tryDate.getMonth() &&
            local.getDate() === tryDate.getDate()
          );
        });

        const bookedSlots = appointmentsThatDay.map(a => {
          const d = new Date(a.dateTime);
          return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        });

        const hasFree = availableTimes.some(t => {
          const [h, m] = t.split(':');
          const tDate = new Date(tryDate);
          tDate.setHours(Number(h), Number(m), 0, 0);
          return !bookedSlots.includes(t) && tDate > new Date();
        });

        if (hasFree) {
          setSelectedDate(new Date(tryDate));
          break;
        }
      }
    }
  }, [bookedTimes, allAppointments]);

  const availableSlots = availableTimes.filter((time, index, array) => {
    const requiredSlots = array.slice(index, index + serviceDuration);
    if (requiredSlots.length < serviceDuration) return false;

    const anyTaken = requiredSlots.some(t => bookedTimes.includes(t));
    if (anyTaken) return false;

    const [hour, minute] = time.split(':');
    const slotDate = new Date(selectedDate);
    slotDate.setHours(Number(hour), Number(minute), 0, 0);

    if (slotDate <= new Date()) return false;

    return true;
  });

  const dayClassName = date => {
    const today = new Date();
    const isPast = date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
    if (isPast) return 'past-day';

    const dayISO = date.toISOString().split('T')[0];

    const appointmentsOfDay = allAppointments.filter(a => {
      const d = new Date(a.dateTime);
      const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
      return localDate.toISOString().split('T')[0] === dayISO;
    });

    const bookedSlots = appointmentsOfDay.map(a => {
      const d = new Date(a.dateTime);
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      return `${h}:${m}`;
    });

    const hasAvailable = availableTimes.some(time => {
      if (bookedSlots.includes(time)) return false;
      const [hour, minute] = time.split(':');
      const timeDate = new Date(date);
      timeDate.setHours(Number(hour), Number(minute), 0, 0);
      return timeDate > new Date();
    });

    return hasAvailable ? '' : 'no-availability';
  };

  
const validarTelefono = () => {
  const { countryCode, phone } = form;

  if (countryCode === '+56' && !/^[1-9][0-9]{8}$/.test(phone)) {
    alert('El número en Chile debe tener 9 dígitos y no comenzar con 0');
    return false;
  }

  if (countryCode === '+54' && !/^[1-9][0-9]{9}$/.test(phone)) {
    alert('El número en Argentina debe tener 10 dígitos');
    return false;
  }

  if (countryCode === '+57' && !/^[1-9][0-9]{9}$/.test(phone)) {
    alert('El número en Colombia debe tener 10 dígitos');
    return false;
  }

  return true;
};


  const handleSubmit = async e => {
    if (!validarTelefono()) return;
    e.preventDefault();
    try {
      const fullPhone = form.countryCode + form.phone;
      await axios.post('http://localhost:3001/api/auth/register', { ...form, phone: fullPhone });

      const [hour, minute] = selectedTime.split(':');
      const localDate = new Date(selectedDate);
      localDate.setHours(Number(hour), Number(minute), 0, 0);

      const isoDateTime = localDate.toISOString();

      await axios.post('http://localhost:3001/api/appointments', {
        email: form.email,
        dateTime: isoDateTime,
        cut_option: selectedService.name,
        durationHours: serviceDuration
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

  const excludedDates = [];
  const today = new Date();
  if (bookedTimes.length === availableTimes.length) {
    const todayCopy = new Date(today);
    todayCopy.setHours(0, 0, 0, 0);
    excludedDates.push(todayCopy);
  }

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
          dayClassName={dayClassName}
          excludeDates={excludedDates}
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
              <div className="phone-input">
                <div className="phone-country">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                    required
                  >
                    <option value="+56">🇨🇱 +56</option>
                    <option value="+54">🇦🇷 +54</option>
                    <option value="+57">🇨🇴 +57</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+34">🇪🇸 +34</option>
                  </select>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Agendar cita</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingCalendar;
