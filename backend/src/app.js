const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Arkham Asylum')
})

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

//crear delitos
app.post('/api/v912/delitos', async (req, res) => {
  const delito = await prisma.delito.create({
      data: {
          tipoDelito: req.body.tipoDelito,
          descripcion: req.body.descripcion,
          fechaCrimen: new Date(req.body.fechaCrimen),
          sentenciaJudicial: req.body.sentenciaJudicial,
          lugarDelito: req.body.lugarDelito,
          estadoCrimen: req.body.estadoCrimen,
          nivelPrioridad: req.body.nivelPrioridad
      }
  })
  res.status(201).send(delito)
})

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



app.listen(port, () => {
  console.log(`Arkham app listening on port ${port}`)
})

