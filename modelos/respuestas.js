const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  respuesta:String,
  estado:Boolean,
  imagen:String,
  valor:Number
});

module.exports = respuestaSchema;