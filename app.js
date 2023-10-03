const express = require('express');
const mongoose = require('./db'); // Importa la conexión a MongoDB desde db.js
const invitadoRoutes = require('./router/invitadoRoutes'); // Importa las rutas de invitados desde tu archivo de rutas
const app = express();
const PORT = 3000;

// Middleware para manejar el formato de las solicitudes JSON
app.use(express.json());

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


