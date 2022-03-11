const mongoose = require('../bin/conexion');

const productoSchema = new mongoose.Schema({
  nombre: {
    type:String,
    unique:true,
    minlength:[3,"El nombre debe contener más de 2 caracteres."],
    maxlength:[20,"El nombre no debe contener más de 20 caracteres."],
    trim:true,
    required:[true,"Éste campo es obligatorio."],
    validate: {
      validator: function(v) {
        return /^[a-zA-ZÑñ ]*$/g.test(v);
      }, message: props => "El nombre no puede contener números."
    }
  },
  precio: {
    type:Number,
    min:[1,"El precio es demasiado bajo."],
    max:[100000,"El precio es demasiado alto."],
    trim:true,
    required:[true,"Éste campo es obligatorio."],
    validate: {
      validator: function(v) {
        return /^[0-9]+$/.test(v);
      }, message: props => "El precio sólo puede contener valores enteros."
    }
  },
  stock: {
    type:Number,
    min:[1,"El stock es demasiado bajo."],
    max:[100000,"Stock máximo alcanzado."],
    trim:true,
    required:[true,"Éste campo es obligatorio."],
    validate: {
      validator: function(v) {
        return /^[0-9]+$/.test(v);
      }, message: props => "El stock sólo puede contener valores enteros."
    }
  },
  categoria: {
    type:mongoose.Schema.ObjectId,
    ref:"categorias",
    trim:true,
    required:[true,"Éste campo es obligatorio."],
  },
  fechaCreac: {
    type:String,
    trim:true,
    required:true,
    validate: {
      validator: function(v) {
        return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(v);
      }, message: props => "Formato inválido."
    }
  },
  fechaAct: {
    type:String,
    trim:true,
    validate: {
      validator: function(v) {
        return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(v);
      }, message: props => "Formato inválido."
    }
  },
  historial: [
    {
      precio: {
        type:Number,
        min:1,
        max:100000,
        trim:true,
        required:true,
        validate: {
          validator: function(v) {
            return /^[0-9]+$/.test(v);
          }, message: props => "El precio sólo puede contener valores enteros."
        }
      },
      stock: {
        type:Number,
        min:1,
        max:100000,
        trim:true,
        required:true,
        validate: {
          validator: function(v) {
            return /^[0-9]+$/.test(v);
          }, message: props => "El stock sólo puede contener valores enteros."
        }
      },
      categoria: {
        type:mongoose.Schema.ObjectId,
        ref:"categorias",
        required:true
      },
      fechaAct: {
        type:String,
        trim:true,
        validate: {
          validator: function(v) {
            return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(v);
          }, message: props => "Formato inválido."
        }
      }
    }
  ]
});

productoSchema.set('toJSON', {getters:true});
module.exports = mongoose.model("productos", productoSchema);
