const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let {
  crearEstudiante,
  connectionDB,
  buscarEstudiante,
  buscarActividad,
  crearActividad,
  actualizandoEstudiante,
  presentarActividad,
  guardarProgreso,
  conseguirProgreso
} = require('./modelos')

connectionDB()



app.post('/crearEstudiante', async (req, res) => {
  try {
    let e = await crearEstudiante(req.body)
    res.send(e)
  } catch (error) {
    res.send(error)
  }
})

app.post('/login', async (req, res) => {
  try {
    let e = await buscarEstudiante(req.body)
    res.send(e)
  } catch (error) {
    res.send(error)
  }
})

// aqui para abajo todo tiene que ver con actividades

// muestra el test
app.get('/test', async (req, res) => {
  try {
    let e = await buscarActividad({ nivel: "test", tipo: "multiple" })
    res.send(e)
  } catch (error) {
    res.send(error)
  }
})

// guarda el nivel del usuario
app.post('/test', async (req, res) => {
  try {
    let { nombre, nivel } = req.body
    let t = await actualizandoEstudiante({ nombre }, { nivel })
    if (t) {
      return res.send({ estatus: 'ok!' })
    }

    res.send({ estatus: 'fail' })
  } catch (error) {

  }
})


app.get('/actividad', async (req, res) => {
  try {
    let { nivel, estudiante } = req.query
    let actividad = await presentarActividad({ nivel, estudiante })
    res.send(actividad)
  } catch (error) {
    res.send(error)
  }
})

app.get('/actividad/:id', async (req, res) => {
  try {
    let { id } = req.params
    let actividad = await buscarActividad({ _id: id })
    res.send({ actividad })
  } catch (error) {
    res.send(error)
  }
})

// se agrega el progreso del usuario
app.post('/actividad', async (req, res) => {
  try {
    let datos = req.body
    let p = await guardarProgreso(datos)
    res.send(p)
  } catch (error) {
    res.send(error)
  }
})

// se agrega el progreso del usuario
app.get('/progreso', async (req, res) => {
  try {
    let {estudiante} = req.body
    let p = await conseguirProgreso(estudiante)
    res.send(p)
  } catch (error) {
    res.send(error)
  }
})



// carga el test predeterminado
let test = require('./data/test.json')
let actividades = require('./data/actividades.json')
app.get('/carga-datos', async (req, res) => {
  try {
    let t = await crearActividad(test)
    let a = actividades.map(async a => {
      return await crearActividad(a)
    })
    let d = await Promise.all(a)

    res.send("Listo, fueron cargados los datos <hr>"
      + JSON.stringify(t.toObject())
      + "<hr>"
      + JSON.stringify(d)
    )
  } catch (error) {
    res.send(error)
  }
})




// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req.url, 'Ruta no Encontrada')
  res.send('Ruta no Encontrada')
})

const port = 3000
app.listen(port, () => console.log(`Servidor corriendo ${port}`))

process
  .on('uncaughtException', (err, origin) => {
    console.log(err)
    console.log("----------------------------")
    console.log(origin)
    process.exit(1)
  })
  .on('unhandledRejection', (reason, promise) => {
    console.log(reason)
    console.log("----------------------------")
    console.log(promise)
    process.exit(1)
  })
