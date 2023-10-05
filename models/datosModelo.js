const mongoose = require('mongoose');

const invitadoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    anfitrion: {
        type: String,
        required: true
    },
    mesa: {
        type: Number,
        required: true
    },
    nombreInvitado: {
        type: String,
        required: true
    },
    cantidadInvitados: {
        type: Number,
        required: true
    },
    niños: {
        type: Number,
        required: false
    },
    numeroTelefono: {
        type: String,
        required: false
    },
    numeroWhatsapp: {
        type: String,
        required: true
    },
    asistir: {
        type: Boolean,
        required: true
    }
}, { collection: "invitado" });

const Invitado = mongoose.model('invitado', invitadoSchema);

module.exports = Invitado;
