const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Arkham Asylum')
})

app.get('/api/912/delitos', async (req, res) => {
  const delitos = await prisma.delito.findMany()
  res.json(delitos)
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

app.listen(port, () => {
  console.log(`Arkham app listening on port ${port}`)
})

