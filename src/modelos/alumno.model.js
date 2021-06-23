'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alumnoSchema = Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    rol: String,
    password: String,
    cursos: [{type: mongoose.Types.ObjectId, ref: 'cursos'}]
}, {collection: 'alumnos'})

module.exports = mongoose.model('Alumnos', alumnoSchema)