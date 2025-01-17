const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Arkham Asylum')
})

//ver todos los delitos
app.get('/api/v912/delitos', async (req, res) => {
  const delitos = await prisma.delito.findMany()
  res.json(delitos)
})

//ver delito
app.get('/api/v912/delitos/:id', async (req, res) => {

  const delito = await prisma.delito.findUnique({
      where: {
          id : parseInt(req.params.id)
      }
  })
  if (delito === null) {
      res.sendStatus(404)
      return
  }
  res.json(delito)
})

//crear delito
app.post('/api/v912/delitos', async (req, res) => {
  const delito = await prisma.delito.create({
      data: {
          tipoDelito: req.body.tipoDelito,
          descripcion: req.body.descripcion,
          fechaDelito: req.body.fechaDelito,
          sentenciaJudicial: req.body.sentenciaJudicial,
          lugarDelito: req.body.lugarDelito,
          estadoDelito: req.body.estadoDelito,
          nivelPrioridad: req.body.nivelPrioridad
      }
  })
  res.status(201).send(delito)
})

//eliminar delito
app.delete('/api/v912/delitos/:id', async (req, res) => {

  const delito = await prisma.delito.findUnique ({
      where: {
          id: parseInt(req.params.id)
      }
  })

  if (delito === null) {
      res.sendStatus(404)
      return
  }

  await prisma.delito.delete({
      where: {
          id: parseInt(req.params.id)
      }
  })

  res.send(delito)

})

//actualizar, modificar delito

app.put('/api/v912/delitos/:id', async (req, res) => {

  let delito = await prisma.delito.findUnique({
      where: {
          id: parseInt(req.params.id)
      }
  })

  if (delito === null) {
      res.sendStatus(404)
      return
  }

  delito = await prisma.delito.update({
      where: {
          id: delito.id
      },
      data: {
        tipoDelito: req.body.tipoDelito,
        descripcion: req.body.descripcion,
        fechaDelito: req.body.fechaDelito,
        sentenciaJudicial: req.body.sentenciaJudicial,
        lugarDelito: req.body.lugarDelito,
        estadoDelito: req.body.estadoDelito,
        nivelPrioridad: req.body.nivelPrioridad
      }    
  })
  res.send(delito)

})

//------------------------------------------------------------------------------------------------------------------------------------------

//ver todas las celdas 
app.get('/api/v912/celdas', async (req, res) => {
  const celdas = await prisma.celda.findMany()
  res.json(celdas)
})

//ver celda
app.get('/api/v912/celdas/:id', async (req, res) => {

  const celda = await prisma.celda.findUnique({
      where: {
          id : parseInt(req.params.id)
      }
  })
  if (celda === null) {
      res.sendStatus(404)
      return
  }
  res.json(celda)
})

//crear celda
app.post('/api/v912/celdas', async (req, res) => {
  const celda = await prisma.celda.create({
      data: {

        tipoCelda: req.body.tipoCelda,
        descripcionCelda: req.body.descripcionCelda,
        nivelSeguridad: req.body.nivelSeguridad,
        camarasSeguridad: req.body.camarasSeguridad,
        sensoresMovimiento: req.body.sensoresMovimiento,
        alarmas: req.body.alarmas,
        criminalAsignado: req.body.criminalAsignado
      }
  })
  res.status(201).send(celda)
})

//eliminar celda
app.delete('/api/v912/celdas/:id', async (req, res) => {

  const celda = await prisma.celda.findUnique ({
      where: {
          id: parseInt(req.params.id)
      }
  })

  if (celda === null) {
      res.sendStatus(404)
      return
  }

  await prisma.celda.delete({
      where: {
          id: parseInt(req.params.id)
      }
  })

  res.send(celda)

})

//actualizar, modificar celda

app.put('/api/v912/celdas/:id', async (req, res) => {

  let celda = await prisma.celda.findUnique({
      where: {
          id: parseInt(req.params.id)
      }
  })

  if (celda === null) {
      res.sendStatus(404)
      return
  }

  celda = await prisma.celda.update({
      where: {
          id: celda.id
      },
      data: {
        tipoCelda: req.body.tipoCelda,
        descripcionCelda: req.body.descripcionCelda,
        nivelSeguridad: req.body.nivelSeguridad,
        camarasSeguridad: req.body.camarasSeguridad,
        sensoresMovimiento: req.body.sensoresMovimiento,
        alarmas: req.body.alarmas,
        criminalAsignado: req.body.criminalAsignado
      }    
  })
  res.send(celda)

})





//------------------------------------------------------------------------------------------------------------------------------------------


//ver todos los criminales
app.get('/api/v912/criminales', async (req, res) => {
  const criminales = await prisma.criminal.findMany()
  res.json(criminales)
})

//ver criminal
app.get('/api/v912/criminales/:id', async (req, res) => {

  const criminal = await prisma.criminal.findUnique({
      where: {
          id : parseInt(req.params.id)
      }
  })
  if (criminal === null) {
      res.sendStatus(404)
      return
  }
  res.json(criminal)
})

//crear criminal REQ = SOLICITUD
app.post('/api/v912/criminales', async (req, res) => {
  const criminal = await prisma.criminal.create({
      data: {
        nombre: req.body.nombre,
        apodo: req.body.apodo,
        edad: req.body.edad,
        genero: req.body.genero,
        delito: req.body.delito,
        tratamientoActual: req.body.tratamientoActual,
        celdaAsignada: req.body.celdaAsignada,
        fechaIngreso: req.body.fechaIngreso,
        nivelRiesgo: req.body.nivelRiesgo,
        foto: req.body.foto
      }
  })
  res.status(201).send(criminal)
})

//eliminar criminal
app.delete('/api/v912/criminales/:id', async (req, res) => {

  const criminal = await prisma.criminal.findUnique ({
      where: {
          id: parseInt(req.params.id)
      }
  })

  if (criminal === null) {
      res.sendStatus(404)
      return
  }

  await prisma.criminal.delete({
      where: {
          id: parseInt(req.params.id)
      }
  })

  res.send(criminal)

})

//actualizar, modificar criminal

app.put('/api/v912/criminales/:id', async (req, res) => {

  let criminal = await prisma.criminal.findUnique({
      where: {
          id: parseInt(req.params.id)
      }
  })

  if (criminal === null) {
      res.sendStatus(404)
      return
  }

  criminal = await prisma.criminal.update({
      where: {
          id: criminal.id
      },
      data: {
        nombre: req.body.nombre,
        apodo: req.body.apodo,
        edad: req.body.edad,
        genero: req.body.genero,
        delito: req.body.delito,
        tratamientoActual: req.body.tratamientoActual,
        celdaAsignada: req.body.celdaAsignada,
        fechaIngreso: req.body.fechaIngreso,
        nivelRiesgo: req.body.nivelRiesgo,
        foto: req.body.foto
      }    
  })
  res.send(criminal)

})
//------------------------------------------------------------------------------------------------------------------------------------------



app.listen(port, () => {
  console.log(`Arkham app listening on port ${port}`)
})

