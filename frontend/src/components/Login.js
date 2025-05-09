import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [rut, setRUT] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { rut, password });
      onLogin(res.data.token);
    } catch {
      alert('Login fallido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="RUT" value={rut} onChange={e => setRUT(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
