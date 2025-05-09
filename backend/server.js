const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const haircutRoutes = require('./routes/haircutRoutes');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api/haircuts', haircutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use((req, res, next) => {
  console.log(`→ ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3001;
app.use((err, req, res, next) => {
  console.error('❌ Error global:', err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
