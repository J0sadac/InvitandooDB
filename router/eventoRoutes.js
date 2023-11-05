const express = require('express');
const router = express.Router();
const Evento = require('../models/datosModelo'); // Importa el modelo de Evento

async function obtenerEvento(req, res, next) {
    let evento;
    try {
        evento = await Evento.findById(req.params.id);
        if (evento == null) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }

    res.evento = evento;
    next();
}

// GET
// Ruta para obtener todos los eventos y sus invitados
router.get('/', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
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
router.put('/:id', obtenerEvento, async (req, res) => {
    try {
        const { anfitriones, fecha, direccion, frases, invitados } = req.body;
        res.evento.anfitriones = anfitriones;
        res.evento.fecha = fecha;
        res.evento.direccion = direccion;
        res.evento.frases = frases;
        res.evento.invitados = invitados;
        
        const eventoActualizado = await res.evento.save();
        res.json(eventoActualizado);
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
