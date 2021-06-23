'use strict'
const Cursos = require('../modelos/cursos.model')

function ejemploCursos(req, res) {
    return res.status(200).send({mensaje: 'Esot es un ejemplo desde cursos controlador'})
}

//Función para agregar Cursos
function agregarCurso(req, res) {
    var cursosModel = new Cursos();
    var params = req.body;

    if(params.nombre){
        cursosModel.nombre = params.nombre;
        cursosModel.profesor = req.user.sub;

        cursosModel.save((err, cursoGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la petición'})
            if(!cursoGuardado) return res.status(500).send({mensaje: 'Error al crear el curso'})
            return res.status(200).send({cursoGuardado})
        })
    }
}

//Función para eliminar curso
function eliminarCurso(req, res) {
    var idCurso = req.params.idCurso;

    Cursos.findByIdAndDelete(idCurso,(err, cursoEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición'})
        if(!cursoEliminado) return res.status(500).send({mensaje: 'No se ha podido eliminar el curso'})
        return res.status(200).send({usuarioEliminado})
    })
}

//Función para editar curso
function editarCurso(req,res) {
    var idCurso = req.params.idCurso;
    var params = req.body;

    Cursos.findByIdAndUpdate(idCurso, params, {new: true}, (err, cursoEditado)=>{
        if(err) return res.status(404).send({mensaje: 'Error en la petición'})
        if(!cursoEditado) return res.status(500).send({mensaje: 'El curso no se ha podido actualizar'})
        return res.status(200).send(cursoEditado)
    })
}

//Obtener cursos
exports.ObtenerCursos = async (req, res) =>{
    await Cursos.find().populate('users').exec((err, doc)=>{
        if(err){
            res.status(500).send({mensaje: 'Error en la petición'})
        }else if(!doc){
            res.status(500).send({mensaje: 'Error al obtener cursos'})
        }else{
            res.status(200).send({doc})
        }
    })
}

module.exports = {
    ejemploCursos,
    agregarCurso,
    eliminarCurso,
    editarCurso
}