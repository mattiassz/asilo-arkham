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



app.listen(port, () => {
  console.log(`Arkham app listening on port ${port}`)
})

