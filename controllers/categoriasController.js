const categoriasModel = require('../models/categoriasModel');

module.exports = {
  traerTodo: async (req, res, next)=> {
    try {
      const categorias = await categoriasModel.find();
      res.json(categorias);
    } catch(e) {
      next(e);
    }
  },
  crear: async (req, res, next)=> {
    try {
      const categoria = new categoriasModel({
        nombre:req.body.nombre
      })
      const document = await categoria.save();
      res.json({document, mensaje: "Creada con éxito", estado: "Ok"});
    } catch(e) {
      console.log(e);
      res.status(200).json({mensaje:"Esa categoria ya existe", estado: "Error"})
    }
  },
  eliminar: async  function (req, res, next) {
    try {
      console.log(req.params.id);
      const data = await categoriasModel.deleteOne({ _id: req.params.id });
      res.json({data, mensaje: "Eliminada con éxito"});
    } catch (e) {
      console.log(e);
      res.status(200).json({mensaje:e.mensaje})
    }
  }
};
