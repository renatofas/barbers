
import React, { useState } from 'react';
import './ReviewModal.css';
import axios from 'axios';

function ReviewModal({ onClose, onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', rating: 5, message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/reviews', form);
      onSubmitted();
      onClose();
    } catch (err) {
      alert('Error al enviar la reseña');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Escribe una reseña</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Tu calificación:
            <select name="rating" value={form.rating} onChange={handleChange}>
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{'★'.repeat(r)}</option>
              ))}
            </select>
          </label>
          <input type="text" name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Escribe tu reseña..." rows="4" value={form.message} onChange={handleChange} required />
          <button type="submit">Enviar reseña</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
