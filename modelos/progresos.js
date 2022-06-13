const mongoose = require('mongoose');


const progresoSchema = new mongoose.Schema({
    actividad: mongoose.mongo.ObjectId,
    estudiante: mongoose.mongo.ObjectId,
    actividadValor: Number,
    emocionValor: Number
},{timestamps:true});

module.exports = mongoose.model('Progresos', progresoSchema);