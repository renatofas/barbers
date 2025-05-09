import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateTime: '',
    cutOption: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Registrar usuario (si no existe)
      await axios.post('http://localhost:3001/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone
      });

      // Agendar cita
      await axios.post('http://localhost:3001/api/appointments', {
        email: form.email,
        dateTime: form.dateTime,
        cutOption: form.cutOption
      });

      alert('Cita agendada correctamente');
    } catch (err) {
      alert('Error al agendar cita');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Teléfono" onChange={handleChange} required />
      <input type="datetime-local" name="dateTime" onChange={handleChange} required />
      <input type="text" name="cutOption" placeholder="Tipo de corte" onChange={handleChange} required />
      <button type="submit">Agendar</button>
    </form>
  );
}

export default AppointmentForm;
