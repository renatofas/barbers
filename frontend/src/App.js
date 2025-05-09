import React, { useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import Login from './components/Login';
import HaircutHistory from './components/HaircutHistory';
import './styles.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <h1>Peluquería Online</h1>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <>
          <AppointmentForm />
          <HaircutHistory />
        </>
      )}
    </div>
  );
}

export default App;
