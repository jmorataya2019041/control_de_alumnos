'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var cursosSchema = Schema({
    nombre: String,
    profesor: {type: mongoose.Types.ObjectId, ref: 'users'}
}, {collection: 'cursos'})

module.exports = mongoose.model('cursos', cursosSchema)

