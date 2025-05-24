const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ Error de conexión MongoDB:'));
db.once('open', () => console.log('✅ Conectado a MongoDB Atlas'));

module.exports = mongoose;
