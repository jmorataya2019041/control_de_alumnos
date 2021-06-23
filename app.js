'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

//Cabeceras
app.use(cors());

//Importación de rutas
const maestro_rutas = require('./src/rutas/maestro.rutas');
const alumno_rutas = require('./src/rutas/alumno.rutas');
const cursos_rutas = require('./src/rutas/cursos.rutas')

//Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

//Carga de rutas
app.use('/proyecto', maestro_rutas, alumno_rutas, cursos_rutas);

//Exportar
module.exports = app;
