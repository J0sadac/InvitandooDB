const express = require('express');
const cors = require('cors');
const mongoose = require('./db'); // Importa la conexión a MongoDB desde db.js
const invitadoRoutes = require('./router/invitadoRoutes'); // Importa las rutas de invitados desde tu archivo de rutas
const app = express();
const PORT = 3000;

// Middleware para manejar el formato de las solicitudes JSON
app.use(express.json());

// Esto permite todas las solicitudes
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
app.use('/invitacion', invitadoRoutes); // Asocia las rutas de invitados a /api/invitados

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal! Arregla las cosas porfa');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


