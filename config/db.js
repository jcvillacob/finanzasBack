const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a MongoDB exitosa.');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar a la base de datos
  }
};

module.exports = connectDB;
