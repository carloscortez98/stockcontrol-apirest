const usuariosModel = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  crear: async (req,res,next)=>{
    try {
      const usuario = new usuariosModel({
        nombre:req.body.nombre,
        usuario:req.body.usuario,
        contraseña:req.body.contraseña
      })
      const document = await usuario.save()
      res.json(document)
    } catch (e) {
      console.log(e);
      res.status(200).json({message:e.message});
      next(e);
    }
  },
  iniciar: async (req, res, next)=> {
    try {
      const document = await usuariosModel.findOne({usuario: req.body.usuario});
      if (document) {
        if (bcrypt.compareSync(req.body.contraseña, document.contraseña)) {
        const token = jwt.sign({usuario:document.usuario}, req.app.get('secretKey'),{})
        res.json({usuario: req.body.usuario, mensaje: "Bienvenido", token:token})
        } else {
          res.json({error:true, mensaje: "Credenciales incorrectas"})
        }
      } else {
        res.json({error:true, mensaje: "Usuario incorrecto o inexistente"})
      }
    } catch(e) {
      next(e);
    }
  },
  eliminar: async  function (req, res, next) {
    try {
      console.log(req.params.id);
      const data = await usuariosModel.deleteOne({ _id: req.params.id });
      res.json({data, message: "Eliminado con éxito"});
    } catch (e) {
      console.log(e);
      res.status(200).json({message:e.message})
    }
  }
};
