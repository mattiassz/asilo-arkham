const express = require('express')
const app = express()
const port = 3002;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Batman App")
})

app.get('/api/v1/criminals', async (req,res)=>{
    const criminales = await prisma.criminal.findMany() //findMany = SELECT * FROM DB
    res.json(criminales)
})

app.get('/api/v1/criminals/:id', async (req,res)=>{
    const criminal = await prisma.criminal.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    if (criminal === null){
        res.sendStatus(404);
        return
    };

    res.json(criminal)
})


app.post('/api/v1/criminals'), async (req,res)=>{
    const criminal = await prisma.criminal.create({
        data: {
            name: req.body.name,     
            alias: req.body.alias,        
            crime : req.body.crime,       
            age: req.body.age,          
            sex: req.body.sex,          
            treatment: req.body.treatment,     
            dangerousness: req.body.dangerousness
        }
    }) // crea un criminal
    res.sendStatus(201).send(criminal) //devolvemos el usuario creado
}


app.delete('/api/v1/criminals/:id'), async (req,res)=>{
    const criminal = await prisma.criminal.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (criminal === null){
        res.sendStatus(404)
        return
    }

    await prisma.criminal.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(criminal) //devolvemos el usuario borrado
}


app.put('/api/v1/criminals/:id'), async (req,res)=>{
    let criminal = await prisma.criminal.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if(criminal===null){ // -1 es igual a que no lo encontró
        res.sendStatus(404)
        return
    }
    await prisma.criminal.update({
        where: {
            id: criminal.id
        },
        data: {
            name: req.body.name,
            alias: req.body.alias,
            crime: req.body.crime,
            age: req.body.age,
            sex: req.body.sex,
            treatment: req.body.treatment,
            dangerousness: req.body.dangerousness
            //si le paso undefined, no me lo modifica
        }
    })
    res.send(criminal)

}


app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})
