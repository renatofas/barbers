import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+56',
    phone: '',
    dateTime: '',
    cutOption: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.name.length < 2) {
      alert('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    const phoneRegex = /^[0-9]{7,12}$/;
    if (!phoneRegex.test(form.phone)) {
      alert('El número debe tener entre 7 y 12 dígitos.');
      return;
    }

    if (!form.cutOption.trim()) {
      alert('Debe ingresar un tipo de corte.');
      return;
    }

    const fullPhone = `${form.countryCode}${form.phone}`;

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: fullPhone
      });

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
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <select name="countryCode" value={form.countryCode} onChange={handleChange} required>
          <option value="+56">🇨🇱 +56 (Chile)</option>
          <option value="+54">🇦🇷 +54 (Argentina)</option>
          <option value="+57">🇨🇴 +57 (Colombia)</option>
          <option value="+1">🇺🇸 +1 (EE.UU.)</option>
          <option value="+34">🇪🇸 +34 (España)</option>
        </select>
        <input
          type="tel"
          name="phone"
          placeholder="Número"
          onChange={handleChange}
          required
        />
      </div>

      <input type="datetime-local" name="dateTime" onChange={handleChange} required />
      <input type="text" name="cutOption" placeholder="Tipo de corte" onChange={handleChange} required />
      <button type="submit">Agendar</button>
    </form>
  );
}

export default AppointmentForm;
