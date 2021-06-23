'use strict'
const mongoose = require('mongoose');
const Maestro = mongoose.Schema;

var maestroSchema = Maestro({
    nombre: String,
    apellido: String,
    rol: String,
    usuario: String,
    password: String,
    cursos: {

    }
}, {collection: 'maestros'})

module.exports = mongoose.model('Maestros', maestroSchema)