require('dotenv').config();
const express = require('express');
const connectDB = require('../config/db');  // Importando la función de conexión

const app = express();

// Conexión a la base de datos
connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola, bienvenido a FinanzasApp');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
