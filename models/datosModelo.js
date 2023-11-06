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
    invitados: [{
        _id: {
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
            required: true
        },
        numeroWhatsapp: {
            type: String,
            required: false
        },
        asistir: {
            type: String,
            required: true
        }
    }],
    fondo: {
        type: String,
        required: true
    },
    imagenes: [{
        type: String,
        required: true
    }],
    datos: {
        mesaDeRegalos: {
            type: String,
            required: true
        },
        direccion: {
            salon: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            ciudad: {
                type: String,
                required: true
            }
        },
        fecha: {
            type: String,
            required: true
        },
        padrinos: [{
            type: String,
            required: false
        }],
        dia: {
            type: String,
            required: true
        },
        novios: {
            novio: {
                type: String,
                required: false
            },
            novia: {
                type: String,
                required: false
            }
        },
        festejado: {
            type: String,
            required: false
        }
    },
    cancion: {
        type: String,
        required: false
    },
    codigoDeVestimenta: {
        hombre: {
            type: String,
            required: true
        },
        mujer: {
            type: String,
            required: true
        }
    },
    evento: {
        type: String,
        required: true
    },
    itinerario: {
            accion: {
                type: String,
                required: true
            },
            ubicacion: {
                type: String,
                required: true
            },
            icono: {
                type: String,
                required: true
            },
            hora: {
                type: String,
                required: true
            }
    },
    ubicacion: {
        type: String,
        required: true
    }
}, { collection: "eventos" });

const Invitado = mongoose.model('eventos', invitadoSchema);

module.exports = Invitado;

