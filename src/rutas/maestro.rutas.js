'use strict'

const express = require('express')
var maestrocontrolador = require('../controladores/maestro.controlador')

//Middlewares
var md_autenticacion = require('../middlewares/authenticated')

//Rutas
var api = express.Router();
api.get('/ejemploMaestros', maestrocontrolador.ejemplo)

module.exports = api;