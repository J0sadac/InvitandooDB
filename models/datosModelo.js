const mongoose = require('mongoose');

const invitadoSchema = new mongoose.Schema({
        evento: {
            type: String,
            required: false
            //temporal
        },
        datos: {
            festejado: {
                type: String,
                required: false
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
            padres: {
                papa: {
                    type: String,
                    required: false
                },
                mama: {
                    type: String,
                    required: false
                }
            },
            fecha: {
                type: String,
                required: false
                //temporal
            },
            lugar: {
                salon: {
                    type: String,
                    required: false
                    //temporal
                },
                direccion: {
                    type: String,
                    required: false
                    //temporal
                },
                ciudad: {
                    type: String,
                    required: false
                    //temporal
                }
            },
            padrinos: [{
                padrino: {
                    type: String,
                    required: false
                },
                de: {
                    type: String,
                    required: false
                }
            }]
        },
        multimedia: {
            carousel: [{
                imageURL: {
                    type: String,
                    require: false
                },
                public_id: {
                    type: String,
                    require: false
                }
            }],
            galeria: [{
                imageURL: {
                    type: String,
                    require: false
                },
                public_id: {
                    type: String,
                    require: false
                }
            }],
            fondo: {
                imageURL: {
                    type: String,
                    require: false
                },
                public_id: {
                    type: String,
                    require: false
                }
            },
            cancion: {
                audioURL: {
                    type: String,
                    require: false
                },
                public_id: {
                    type: String,
                    require: false
                }
            },
            videos: {
                type: String,
                require: false
            },
            portada: [{
                imageURL: {
                    type: String,
                    require: false
                },
                public_id: {
                    type: String,
                    require: false
                }
            }],
            flor: {
                imageURL: {
                    type: String,
                    require: false
                },
                public_id: {
                    type: String,
                    require: false
                }
            }
        },
        mesaDeRegalos: [{
            modalidad: {
                type: String,
                require: false
            },
            icono: {
                type: String,
                require: false
            },
            explicacion: {
                type: String,
                require: false
            },
            codigo: {
                type: String,
                require: false
            }
        }],
        frases: [{
            type: String,
            require: false
        }],
        itinerario: [{
            accion: {
                type: String,
                required: false
            },
            ubicacion: {
                type: String,
                required: false
            },
            icono: {
                type: String,
                required: false
            },
            hora: {
                type: String,
                required: false
            },
            direccion: {
                type: String,
                required: false
            }
        }],
        vestimenta: {
            hombre: {
                type: String,
                required: false
            },
            mujer: {
                type: String,
                required: false
            }
        },
        ubicacion: {
            type: String,
            required: false
        },
        invitados: [{
            mesa: {
                type: Number,
                required: false
                //temporal
            },
            invitado: {
                type: String,
                required: false
                //temporal
            },
            pase: {
                type: Number,
                required: false
                //temporal
            },
            niños: {
                type: Number,
                required: false
            },
            telefono: [{
                type: String,
                required: false
                //temporal
            }],
            asistir: {
                type: String,
                required: false
                //temporal
            },
        }],
        anfitrion: {
            type: String
        }
}, { collection: "eventos" });

const Invitado = mongoose.model('eventos', invitadoSchema);

module.exports = Invitado;

