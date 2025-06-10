const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const haircutRoutes = require('./routes/haircutRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

const app = express();

// 🔓 CORS genérico (acepta todo). Úsalo solo si no puedes instalar dependencias.
app.use(cors());

app.use(express.json({ limit: '10mb' }));

// Rutas
app.use('/api/reviews', reviewRoutes);
app.use('/api/haircuts', haircutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Middleware de logging
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.url}`);
  next();
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error global:', err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Inicio del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
