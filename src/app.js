require('dotenv').config();
const express = require('express');
const connectDB = require('../config/db');  // Importando la función de conexión
const appRouter = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Conexión a la base de datos
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

// Montar el router
app.use('/api/v1', appRouter);

// Manejo de errores (este middleware debe ser el último)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
