'use strict';
const mongoose = require('mongoose');
const app = require('./app');
const port = '3000'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/practica',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Se encuentra conectado a la base de datos');

    app.listen(port, function(){
        console.log('Esta funcionando en el puerto 3000')
    })
}).catch(err => console.log(err))

