const express = require('express');
const router = express.Router();
const Invitado = require('../models/datosModelo'); // Importa el modelo de Invitado

async function obtenerInvitado(req, res, next) {
    let invitado;
    try {
        invitado = await Invitado.findById(req.params.id);
        if (invitado == null) {
            return res.status(404).json({ mensaje: 'Invitado no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }

    res.invitado = invitado;
    next();
}

//GET
// Ruta para obtener todos los invitados
router.get('/', async (req, res) => {
    const { mesa } = req.query;
    try {
        if (mesa) {
            // Si se proporciona el parámetro mesa, buscar invitados por mesa
            const invitados = await Invitado.find({ mesa: mesa });
            res.json(invitados);
        } else {
            // Si no se proporciona el parámetro mesa, obtener todos los invitados
            const invitados = await Invitado.find();
            res.json(invitados);
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

router.get('/:id', obtenerInvitado, (req, res) => {
    res.json(res.invitado);
});



//POST
// Ruta para crear un nuevo invitado
router.post('/', async (req, res) => {
    const invitado = new Invitado({
        anfitrion: req.body.anfitrion,
        mesa: req.body.mesa,
        nombreInvitado: req.body.nombreInvitado,
        cantidadInvitados: req.body.cantidadInvitados,
        niños: req.body.niños,
        numeroTelefono: req.body.numeroTelefono,
        numeroWhatsapp: req.body.numeroWhatsapp
    });

    try {
        const nuevoInvitado = await invitado.save();
        res.status(201).json(nuevoInvitado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


// Otras rutas para actualizar y eliminar invitados pueden ir aquí

// Actualizar un invitado por su ID
router.put('/:id', obtenerInvitado, async (req, res) => {
    if (req.body.anfitrion != null) {
        res.invitado.anfitrion = req.body.anfitrion;
    }
    if (req.body.mesa != null) {
        res.invitado.mesa = req.body.mesa;
    }
    if (req.body.nombreInvitado != null) {
        res.invitado.nombreInvitado = req.body.nombreInvitado;
    }
    if (req.body.cantidadInvitados != null) {
        res.invitado.cantidadInvitados = req.body.cantidadInvitados;
    }
    if (req.body.niños != null) {
        res.invitado.niños = req.body.niños;
    }
    if (req.body.numeroTelefono != null) {
        res.invitado.numeroTelefono = req.body.numeroTelefono;
    }
    if (req.body.numeroWhatsapp != null) {
        res.invitado.numeroWhatsapp = req.body.numeroWhatsapp;
    }
    try {
        const invitadoActualizado = await res.invitado.save();
        res.json(invitadoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Eliminar un invitado por su ID
router.delete('/:id', obtenerInvitado, async (req, res) => {
    try {
        await res.invitado.remove();
        res.json({ mensaje: 'Invitado eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


module.exports = router;
