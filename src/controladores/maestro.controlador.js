'use strict'
const Maestro = require('../modelos/maestro.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../servicios/jwt');

function ejemplo(req, res) {
    res.status(200).send({mensaje: 'Esto es un ejemplo de Maestro Controlador'})
}


module.exports = {
    ejemplo
}