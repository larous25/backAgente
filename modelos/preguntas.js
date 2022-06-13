const mongoose = require('mongoose');
const Respuestas = require('./respuestas');

const preguntasSchema = new mongoose.Schema({
    pregunta: {
      type: String,
      required: true
    },
    valor: {
        type: Number,
        required: true,
        default: 0
    },
    respuestas:[Respuestas]
});

module.exports = preguntasSchema;