const productosModel = require('../models/productosModel');
const categoriasModel = require('../models/categoriasModel');

module.exports = {
  traerTodo: async (req, res, next)=> {
    try {
      const productos = await productosModel.find().populate("categoria");
      res.json(productos);
    } catch(e) {
      next(e);
    }
  },
  traerPorId: async (req, res, next)=> {
    try {
      console.log(req.params.id);
      const producto = await productosModel.findById(req.params.id).populate({path: 'historial.categoria'});
      res.json(producto);
    } catch(e) {
      next(e);
    }
  },
  crear: async (req, res, next)=> {
    try {
      const categoria = await categoriasModel.findByIdAndValidate(req.body.categoria);
      if(categoria.error){
        res.json(categoria);
        return;
      }
      console.log(req.body);
      const producto = new productosModel({
        nombre:req.body.nombre,
        precio:req.body.precio,
        stock:req.body.stock,
        categoria:req.body.categoria,
        fechaCreac:req.body.fechaCreac,
        historial: {
          precio:req.body.precio,
          stock:req.body.stock,
          categoria:req.body.categoria
        }
      })
      const document = await producto.save();
      res.json({document, mensaje: "Creado con éxito", estado: "Ok"});
    } catch(e) {
      console.log(e);
      res.status(200).json({mensaje:"Ese producto ya existe", estado: "Error"})
    }
  },
  actualizar: async function (req, res, next) {
    try {
      const categoria = await categoriasModel.findByIdAndValidate(req.body.categoria);
      if(categoria.error){
        res.json(categoria);
        return;
      }
      console.log(req.params.id, req.body);
      const document = await productosModel.updateOne({ _id: req.params.id }, {
      precio:req.body.precio,
      stock:req.body.stock,
      categoria:req.body.categoria,
      fechaAct:req.body.fechaAct })

      const historial = await productosModel.updateOne({ _id: req.params.id}, {
        $push: {
          historial: {
            precio:req.body.precio,
            stock:req.body.stock,
            categoria:req.body.categoria,
            fechaAct:req.body.fechaAct
          }
        }
      })

      res.json({document, mensaje: "Actualizado con éxito", estado: "Ok"});
    } catch (e) {
      console.log(e);
      res.status(200).json({mensaje:"Revise los campos", estado: "Error"})
    }
  },
  eliminar: async  function (req, res, next) {
    try {
      console.log(req.params.id);
      const data = await productosModel.deleteOne({ _id: req.params.id });
      res.json({data, mensaje: "Eliminado con éxito"});
    } catch (e) {
      console.log(e);
      res.status(200).json({mensaje:e.mensaje})
    }
  }
};
