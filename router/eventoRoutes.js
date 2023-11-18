const express = require('express');
const router = express.Router();
const Evento = require('../models/datosModelo'); // Importa el modelo de Evento

async function obtenerEvento(req, res, next) {
    const anfitrionParam = req.query.anfitrion;
    const invitadoIdParam = req.query.invitadoId;

    try {
        if (!anfitrionParam) {
            return res.status(400).json({ mensaje: 'El parámetro "anfitrion" es obligatorio.' });
        }

        const evento = await Evento.findOne({ anfitrion: anfitrionParam });
        if (evento) {
            if (invitadoIdParam) {
                // Si se proporciona el ID del invitado, busca y asigna solo ese invitado del evento
                const invitado = evento.invitados.find(i => i._id === invitadoIdParam);
                if (invitado) {
                    res.evento = evento;
                    res.invitado = invitado;
                    next();
                } else {
                    return res.status(404).json({ mensaje: 'Invitado no encontrado.' });
                }
            } else {
                // Si no se proporciona el ID del invitado, asigna solo el evento a la respuesta
                res.evento = evento;
                next();
            }
        } else {
            res.status(404).json({ mensaje: 'Evento no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

// GET
// Ruta para obtener un invitado por su ID para un anfitrión específico o el evento completo si no se proporciona ningún parámetro
router.get('/', async (req, res) => {
    const anfitrionParam = req.query.anfitrion; // Obtiene el valor del parámetro 'anfitrion' de la URL
    const invitadoIdParam = req.query.invitadoId; // Obtiene el valor del parámetro 'invitadoId' de la URL

    try {
        if (!anfitrionParam && !invitadoIdParam) {
            // Si no se proporcionan ambos parámetros, devuelve el evento completo
            const eventos = await Evento.find();
            res.json(eventos);
        } else {
            // Si se proporcionan ambos parámetros, busca el evento del anfitrión específico
            let evento = await Evento.findOne({ anfitrion: anfitrionParam });

            if (evento) {
                if (invitadoIdParam) {
                    // Si se proporciona el ID del invitado, busca y devuelve solo ese invitado del evento
                    const invitado = evento.invitados.find(i => i._id === invitadoIdParam);
                    if (invitado) {
                        const eventoConInvitado = {
                            ...evento.toObject(),
                            invitados: [invitado]
                        };
                        res.json(eventoConInvitado);
                    } else {
                        res.status(404).json({ mensaje: 'Invitado no encontrado.' });
                    }
                } else {
                    // Si no se proporciona el ID del invitado, devuelve el evento completo
                    res.json(evento);
                }
            } else {
                res.status(404).json({ mensaje: 'Evento no encontrado.' });
            }
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});



router.get('/:id', obtenerEvento, (req, res) => {
    res.json(res.evento);
});

// POST
// Ruta para crear un nuevo evento con invitados
router.post('/', async (req, res) => {
    try {
        const { anfitrion, invitadoId, asistir } = req.body;

        // Verifica si se proporcionaron los parámetros "anfitrion", "invitadoId" y "asistir"
        if (!anfitrion || !invitadoId || asistir === undefined) {
            return res.status(400).json({ mensaje: 'Los parámetros "anfitrion", "invitadoId" y "asistir" son obligatorios.' });
        }

        // Encuentra el evento por el anfitrión
        const evento = await Evento.findOne({ anfitrion });

        if (evento) {
            // Encuentra el invitado en el evento
            const invitado = evento.invitados.find(i => i._id === invitadoId);

            if (invitado) {
                // Actualiza la confirmación de asistencia del invitado
                invitado.asistir = asistir;

                // Guarda el evento actualizado en la base de datos
                const eventoActualizado = await evento.save();
                res.status(200).json(eventoActualizado);
            } else {
                res.status(404).json({ mensaje: 'Invitado no encontrado.' });
            }
        } else {
            res.status(404).json({ mensaje: 'Evento no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// PUT
// Ruta para actualizar la confirmación de asistencia de un invitado por su ID y las propiedades "anfitrion" e "invitadoId"
router.put('/confirmar-asistencia', obtenerEvento, async (req, res) => {
    try {
        const { anfitrion, invitadoId, asistir } = req.body; // Obtén los valores del cuerpo de la solicitud

        // Verifica si se proporcionaron las propiedades "anfitrion", "invitadoId" y "asistir" en el cuerpo de la solicitud
        if (!anfitrion || !invitadoId || !asistir) {
            return res.status(400).json({ mensaje: 'Los parámetros "anfitrion", "invitadoId" y "asistir" son obligatorios.' });
        }

        const invitado = res.evento.invitados.find(i => i._id === invitadoId);

        if (invitado) {
            // Si se encuentra el invitado, actualiza su confirmación de asistencia
            invitado.asistir = asistir;

            const eventoActualizado = await res.evento.save();
            res.json(eventoActualizado);
        } else {
            res.status(404).json({ mensaje: 'Invitado no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// DELETE
// Ruta para eliminar un evento por su ID
router.delete('/:id', obtenerEvento, async (req, res) => {
    try {
        await res.evento.remove();
        res.json({ mensaje: 'Evento eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
