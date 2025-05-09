import React, { useState } from 'react';
import axios from 'axios';

function HaircutHistory() {
  const [rut, setRUT] = useState('');
  const [cuts, setCuts] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(\`http://localhost:3001/api/haircuts/\${rut}\`);
      setCuts(res.data);
    } catch {
      alert('Error al obtener historial');
    }
  };

  return (
    <div>
      <input type="text" placeholder="RUT" value={rut} onChange={e => setRUT(e.target.value)} />
      <button onClick={fetchHistory}>Ver Historial</button>
      <ul>
        {cuts.map(cut => (
          <li key={cut.id}>
            <img src={cut.image_url} alt="Corte" width="100" />
            <p>{cut.description}</p>
            <p>{cut.date_time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HaircutHistory;
