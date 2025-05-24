import React, { useState } from 'react';
import axios from 'axios';

function HaircutHistory() {
  const [email, setEmail] = useState('');
  const [cuts, setCuts] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/haircuts/${email}`);
      setCuts(res.data);
    } catch {
      alert('Error al obtener historial');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={fetchHistory}>Ver Historial</button>

      <ul>
        {cuts.map(cut => (
          <li key={cut._id}>
            <img src={`data:image/jpeg;base64,${cut.image_base64}`} alt="Corte" width="150" />
            <p>{cut.description}</p>
            <p>{new Date(cut.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HaircutHistory;
