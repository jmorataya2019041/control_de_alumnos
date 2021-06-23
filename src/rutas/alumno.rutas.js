'use strict'

const express = require('express');
const alumnocontrolador = require('../controladores/alumno.controlador')

//Middlewares
var md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.get('/ejemploAlumno',md_autenticacion.ensureAuth, alumnocontrolador.ejemplo)
api.post('/agregarAlumno', alumnocontrolador.agregarAlumno)
api.delete('/eliminarAlumno/:idAlumno',md_autenticacion.ensureAuth, alumnocontrolador.eliminarAlumno)
api.put('/editarAlumno/:idAlumno',md_autenticacion.ensureAuth, alumnocontrolador.editarAlumno)
api.get('/cursosAlumno/:cursos',md_autenticacion.ensureAuth, alumnocontrolador.buscarCursos)
api.post('/loginAlumno', alumnocontrolador.loginAlumno)
module.exports = api;