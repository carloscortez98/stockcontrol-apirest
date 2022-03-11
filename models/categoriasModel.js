const mongoose = require('../bin/conexion');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type:String,
    unique:true,
    minlength:[3,"El nombre debe contener más de 2 caracteres."],
    maxlength:[20,"El nombre no debe contener más de 20 caracteres."],
    trim:true,
    required:[true,"Éste campo es obligatorio."],
    validate: {
        validator: function(v) {
          return /^[A-Za-z\s]+$/g.test(v);
        }, message: props => "El nombre no puede contener números o signos."
      }
    }
  });

  categoriaSchema.statics.findByIdAndValidate = async function(id) {
    const document = await this.findById(id);
    if(!document) {
      return {
        error:true,
        message:"No existe esa categoria."
      }
    }
    return document;
  }

  module.exports = mongoose.model("categorias", categoriaSchema);
