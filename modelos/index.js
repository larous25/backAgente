
const mongoose = require("mongoose");
const actividades = require("./actividades");

const Actividades = require("./actividades");
const Estudiantes = require("./estudiantes");
const Progreso = require("./progresos");


async function connectionDB() {

  await mongoose.connect('mongodb://0.0.0.0:27017/AgenteInteligente', { 
    useNewUrlParser: true,
    authSource : "admin",
    user: "root",
    pass: "example"
   });
}

async function disconnectDB() {
  await mongoose.disconnect();
}

// mongoose
//  .connect(database.URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//  })
//  .then((db) => console.log("db is connected"))
//  .catch((err) => console.log(err));

async function crearEstudiante(datos) {
  let nuevoEstudiante =  new Estudiantes(datos).save()
  return nuevoEstudiante;
}

async function buscarEstudiante(datos) {
  let estudiante =  await Estudiantes.findOne(datos)
  return estudiante;
}

async function buscarActividad(datos) {
  let estudiante =  await Actividades.findOne(datos)
  return estudiante;
}

async function crearActividad(datos) {
  let nuevaActividad =  new Actividades(datos).save()
  return nuevaActividad;
}

async function actualizandoEstudiante (query, data) {
  let estudiante = await Estudiantes.findOneAndUpdate(query, data)
  return estudiante;
}

async function presentarActividad ({ nivel, estudiante }) {


  let p = await Progreso.find({estudiante})
  let c = p.length
  
  let a = await Actividades.find({ nivel }).skip(c)

  if(c%3 == 0) {
  // if(c%3 == 0 && c != 0) {
    return { actividad:a[0], agente: { progresos:p } };
  } else {
    return { actividad:a[0] };
  }

}

async function guardarProgreso (datos) {
  return await new Progreso(datos).save()
}

async function conseguirProgreso (estudiante) {
  return await Progreso.find({estudiante})
}

mongoose.connection.on("error", e => { 
  console.log("HA OCURRIDO UN ERROR EN LA BASE DE DATOS")
  console.error(e); 
});

mongoose.connection.once('open', _ => {
  console.log('La base de datos se encuentra conectada.')
})

module.exports = {
  connectionDB,
  crearEstudiante,
  buscarEstudiante,
  buscarActividad,
  crearActividad,
  actualizandoEstudiante,
  presentarActividad,
  guardarProgreso,
  conseguirProgreso
}