const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    nivel: String,
    nombre: {
        type: String,
        required: true
    },
    contrasena:  {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Estudiantes', estudianteSchema);