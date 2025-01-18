const express = require('express')
const app = express()
const port = 3002;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Batman App")
})


///////////////////////////////////    API DE CRIMINALES    /////////////////////////////////////



app.get('/api/v1/criminals', async (req,res)=>{
    const criminales = await prisma.criminal.findMany() //findMany = SELECT * FROM DB
    res.send(criminales)
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

    res.send(criminal)
})


app.post('/api/v1/criminals', async (req, res) => {
    const criminal = await prisma.criminal.create({
        data: {
            name: req.body.name,
            alias: req.body.alias,
            crime: req.body.crime,
            age: req.body.age,
            sex: req.body.sex,
            treatment: req.body.treatment,
            dangerousness: req.body.dangerousness,
            staff_asigned: req.body.staff_asigned

        }
    })

    res.status(201).json(criminal); // Devolvemos el usuario creado
})


app.delete('/api/v1/criminals/:id', async (req,res)=>{
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
})


app.put('/api/v1/criminals/:id', async (req,res)=> {
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
            dangerousness: req.body.dangerousness,
            staff_asigned: req.body.staff_asigned
            //si le paso undefined, no me lo modifica
        }
    })
    res.send(criminal)

})



///////////////////////////////////    API DE STAFF    /////////////////////////////////////



app.get('/api/v1/staff', async (req,res)=>{ //traer todo el staff
    const staff = await prisma.staff.findMany()
    res.send(staff)
})



app.get('/api/v1/staff/:dni', async (req,res)=>{ //traer un trabajador del staff
    const worker = await prisma.staff.findUnique({
        where: {
            dni: parseInt(req.params.dni)
        }
    })
    res.send(worker)
})





app.delete('/api/v1/staff/:dni', async (req,res)=>{  //borrar alguno edl staff
    const worker = await prisma.staff.findUnique({
        where: {
            dni: parseInt(req.params.dni)
        }})
    if(worker === null){
        res.sendStatus(404)
        return
    }
    await prisma.staff.delete({
        where: {
            dni: parseInt(req.params.dni)
        }
    })
    res.send(worker)
})




app.post('/api/v1/staff', async (req, res) => {  //crear alguien del staff
    const new_worker = await prisma.staff.create({
        data: {
            dni: req.body.dni,
            name: req.body.name,
            rol: req.body.rol,
            shift: req.body.shift,
            contact: req.body.contact
        }})
    res.send(new_worker)
})





app.put('/api/v1/staff/:dni', async (req,res)=> {  //modificar alguien del staff
    let worker = await prisma.staff.findUnique({
        where: {
            dni: parseInt(req.params.dni)
        }
    })
    if(worker === null){ // -1 es igual a que no lo encontró
        res.sendStatus(404)
        return
    }
    await prisma.staff.update({
        where: {
            dni: parseInt(req.params.dni)
        },
        data: {
            dni: req.body.dni,
            name: req.body.name,
            rol: req.body.rol,
            shift: req.body.shift,
            contact: req.body.contact
            
        }
    })
    res.send(worker)

})



app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})
