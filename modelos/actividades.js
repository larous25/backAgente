const mongoose = require('mongoose');
const Pregunta = require('./preguntas');

const actividadesSchema = new mongoose.Schema({
    nivel: {
      type: String,
      required: true,
      enum:{
        values: ['basico', 'medio', 'test'],
        message: 'Opción {VALUE} no soportada para comunicacion'
      }
    },
    titulo: {
        type: String,
        required: true
    },
    tipo: {
      type: String,
      required: true,
      enum:{
        values: ['multiple', 'completar', 'emparejar', 'ordenar'],
        message: 'Opción {VALUE} no soportada como un tipo'
      }
    },
    imagen:String,
    preguntas: [Pregunta]
});

module.exports = mongoose.model('Actividades', actividadesSchema);