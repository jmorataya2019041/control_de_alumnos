'use strict'
const Alumnos = require('../modelos/alumno.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../servicios/jwt');

function ejemplo(req, res){
    res.status(200).send({mensaje: 'Hola esto es un ejemplo de que soy una alumna logeada'})
}

//Función para agregar alumno
function agregarAlumno(req, res) {
    var alumnoModel = new Alumnos();
    var params = req.body;

    if (params.usuario && params.nombre && params.password) {
        alumnoModel.nombre = params.nombre;
        alumnoModel.apellido = params.apellido;
        alumnoModel.usuario = params.usuario;
        alumnoModel.rol = "ROL_ALUMNO";
        alumnoModel.cursos = {
            
        }

        Alumnos.find({ $or: [
            {usuario: alumnoModel.usuario},
            {nombre: alumnoModel.nombre}
        ]}).exec((err, alumnoEncontrado) =>{
            if(err) return res.status(500).send({mensaje:'Error en la petición'})
            if(alumnoModel.cursos.length >=3){
                return res.status(500).send({mensaje: 'No puede pertenecer a más de 3 cursos'})
            }else{
                Alumnos.findByIdAndUpdate({ $push:
                {
                    cursos: alumnoModel
                }})
            }
            if(alumnoEncontrado && alumnoEncontrado.length >= 1){
                return res.status(500).send({mensaje: 'Alumno ya registrado'})
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordEncrypt)=>{
                    alumnoModel.password = passwordEncrypt;
                    alumnoModel.save((err, alumnoGuardado)=>{
                        if(err) return res.status(500).send({mensaje: 'Error al guardar el alumno'})
                        if(alumnoGuardado){
                            res.status(200).send({alumnoGuardado})
                        }else{
                            res.status(500).send({mensaje: 'El alumno no se ha podido registrar'})
                        }
                    })
                })
            }
        })
    }
}

//Función para eliminar el alumno
function eliminarAlumno(req, res) {
    const idAlumno = req.params.idAlumno;

    if(idAlumno != req.user.sub){
        res.status(404).send({mensaje: 'No tiene la autorización para eliminar'})
    }

    Alumnos.findByIdAndDelete(idAlumno, (err, alumnoEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'})
        if(!alumnoEliminado) return res.status(500).send({mensaje: 'El alumno no se ha podido eliminar'})
        return res.status(200).send(alumnoEliminado)
    })
}

//Función para editar
function editarAlumno(req, res){
    var idAlumno = req.params.idAlumno;
    var params = req.body;

    delete params.password;

    if(idAlumno != req.user.sub){
        return res.status(404).send({mensaje: 'No tiene la autorización para editar'})
    }

    Alumnos.findByIdAndUpdate(idAlumno, params, {new: true}, (err, alumnoEditado)=>{
        if(err) return res.status(404).send({mensaje: 'Error en la petición'})
        if(!alumnoEditado) return res.status(404).send({mensaje: 'No se ha podido editar al alumno'})
        return res.status(200).send(alumnoEditado)
    })
}

//Función para buscar por cursos
function buscarCursos(req, res) {
    var cursos = req.params.cursos

    Alumnos.findById(cursos, (err, alumnoEncontrado) =>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'})
        if(!alumnoEncontrado) return res.status(500).send({mensaje: 'Erro al obtener los datos'})
        return res.status(200).send({Cursos: alumnoEncontrado})
    })
}

//Logear
function loginAlumno(req, res) {
    var params = req.body;
    Alumnos.findOne({usuario: params.usuario}, (err, alumnoEncontrado)=>{
        if(err){return res.status(500).send({mensaje: 'Error en la petición'})}
        if(alumnoEncontrado){
            bcrypt.compare(params.password, alumnoEncontrado.password,(err, passCorrect) =>{
               if(passCorrect){
                   if(params.Token === 'true'){
                       return res.status(200).send({token: jwt.createToken(alumnoEncontrado)})
                   }else{
                       alumnoEncontrado.password = undefined;
                       return res.status(200).send({alumnoEncontrado})
                   }
               }else{
                   res.status(404).send({mensaje: 'El alumno no se ha podido identificar'})
               }
            })
        }else{
            res.status(404).send({mensaje: 'El alumno no ha podido ingresar'})
        }
    })
}

//Obtener alumnos
exports.obtenerAlumnos = async (req, res) =>{
    console.log('HOLA',moment().milliseconds()) 
    await Alumnos.find((err, doc)=>{
        if(err){
            res.status(500).send({mensaje: 'Error en la petición'})
        }else if(!doc){
            return res.status(500).send({mensaje: 'Error al obtener los alumnos'})
        }else{
            return res.status(200).send({doc})
        }
    })
    console.log('Hola 2', moment().milliseconds())
}

module.exports = {
    ejemplo,
    agregarAlumno,
    eliminarAlumno,
    editarAlumno,
    buscarCursos,
    loginAlumno
}