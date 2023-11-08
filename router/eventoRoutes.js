const express = require('express');
const router = express.Router();
const Evento = require('../models/datosModelo'); // Importa el modelo de Evento

async function obtenerEvento(req, res, next) {
    let evento;
    try {
        evento = await Evento.findById(req.params.id);
        if (evento == null) {
            return res.status(404).json({ mensaje: 'Evento no econtrado.' });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }

    res.evento = evento;
    next();
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
    const evento = new Evento({
        anfitriones: req.body.anfitriones,
        fecha: req.body.fecha,
        direccion: req.body.direccion,
        frases: req.body.frases,
        invitados: req.body.invitados
    });

    try {
        const nuevoEvento = await evento.save();
        res.status(201).json(nuevoEvento);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// PUT
// Ruta para actualizar un evento por su ID
// PUT
// Ruta para actualizar un evento por su ID y las propiedades "anfitrion" e "invitadoId"
router.put('/', obtenerEvento, async (req, res) => {
    try {
        const { anfitrion, invitadoId } = req.query; // Obtiene los valores de los parámetros de consulta

        // Verifica si se proporcionaron las propiedades "anfitrion" e "invitadoId" en la solicitud
        if (!anfitrion || !invitadoId) {
            return res.status(400).json({ mensaje: 'Los parámetros "anfitrion" e "invitadoId" son obligatorios.' });
        }

        // Actualiza las propiedades "anfitrion" e "invitadoId" del evento
        res.evento.anfitrion = anfitrion;
        const invitado = res.evento.invitados.find(i => i._id === invitadoId);

        if (invitado) {
            // Si se encuentra el invitado, actualiza sus propiedades específicas
            // Aquí puedes agregar más propiedades según sea necesario
            invitado.asistir = req.body.asistir; // Actualiza la propiedad "asistir" del invitado

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
