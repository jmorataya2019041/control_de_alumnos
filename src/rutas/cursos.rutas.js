'use strict'
const express = require('express')
const cursoscontrolador = require('../controladores/cursos.controlador')

var md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.get('/ejemploCursos', cursoscontrolador.ejemploCursos)
api.post('/agregarCurso',cursoscontrolador.agregarCurso)
module.exports = api;