const express = require('express');
const cors = require('cors');
const mongoose = require('./db'); // Importa la conexión a MongoDB desde db.js
const eventoRoutes = require('./router/eventoRoutes'); // Importa las rutas de eventos desde tu archivo de rutas
const app = express();
const PORT = 3000;

// Middleware para manejar el formato de las solicitudes JSON
app.use(express.json());

// Middleware de CORS
const allowedOrigins = ['http://localhost:3000', 'https://invitandoo.com'];
const corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Rutas
app.use('/eventos', eventoRoutes); // Asocia las rutas de eventos a /eventos

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal! Arregla las cosas por favor');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
