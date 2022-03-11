const mongoose = require('../bin/conexion');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type:String,
    minlength:[3,"Su nombre debe contener más de 2 caracteres."],
    maxlength:[20,"Su nombre no debe contener más de 20 caracteres."],
    trim:true,
    required:[true,"Éste campo es obligatorio."],
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/g.test(v);
      }, message: props => "Su nombre no puede contener números."
    }
  },
  usuario: {
    type:String,
    minlength:[3,"Su usuario debe contener más de 2 caracteres."],
    maxlength:[50,"Su usuario no puede contener más de 20 caracteres."],
    unique:true,
    trim:true,
    required:[true,"Éste campo es obligatorio."],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      }, message: props => "Su usuario sólo debe tener letras y/o números."
    }
  },
  contraseña: {
    type:String,
    minlength:[3,"Su contraseña debe contener más de 2 caracteres."],
    maxlength:[100,"Su contraseña no puede contener más de 100 caracteres."],
    required:[true,"Éste campo es obligatorio."]
  }
});

usuarioSchema.pre("save", function(next) {
  this.contraseña = bcrypt.hashSync(this.contraseña, 10);
  next();
});

module.exports = mongoose.model("usuarios", usuarioSchema);
