const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = 3002;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Batman App")
})


///////////////////////////////////    API DE CRIMINALES    /////////////////////////////////////



app.get('/api/v1/criminals', async (req,res)=>{
    const criminales = await prisma.criminal.findMany() //findMany = SELECT * FROM DBG
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

    let staff = await prisma.staff.findUnique({
        where: {
            dni: parseInt(req.body.staff_asigned)
        }
    })

    if (staff === null){
        res.send(404)
        return
    }

    let jail = await prisma.jails.findUnique({
        where: {
            jail_number: parseInt(req.body.jail)
        }
    })

    if (jail === null){
        res.send(404)
        return
    }



    const criminal = await prisma.criminal.create({
        data: {
            name: req.body.name,
            alias: req.body.alias,
            age: req.body.age,
            sex: req.body.sex,
            treatment: req.body.treatment,
            dangerousness: req.body.dangerousness,
            staff_asigned: req.body.staff_asigned,
            jail: req.body.jail

        }
    })

    res.status(201).send(criminal); // Devolvemos el usuario creado
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
    if(criminal === null){ 
        res.sendStatus(404)
        return
    }
    if (req.body.jail_number !== null){
        let jail = await prisma.jails.findUnique({
            where: {
                jail_number: parseInt(req.body.jail)
            }
        })
        if (jail === null){
            res.sendStatus(404)
            return
        }
    }
    
    if ( req.body.staff_asigned !== null){
        let staff = await prisma.staff.findUnique({
            where: {
                dni: parseInt(req.body.staff_asigned)
            }
        })
        if (staff === null){
            res.send(404)
            return
        }
    }
    

    await prisma.criminal.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            name: req.body.name,
            alias: req.body.alias,
            age: req.body.age,
            sex: req.body.sex,
            treatment: req.body.treatment,
            dangerousness: req.body.dangerousness,
            staff_asigned: req.body.staff_asigned,
            jail: req.body.jail
            //si le paso undefined, no me lo modifica
        }
    })
    res.send(criminal)

})



///////////////////////////////////    STAFF    /////////////////////////////////////



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



/////////////////////////////////////  CRIMES   //////////////////////////////////////////////////////



app.get('/api/v1/crimes', async (req,res)=>{
    const crimes = await prisma.crimes.findMany()
    res.send(crimes)
})


app.get('/api/c1/crimes/:crime_number', async (req,res)=>{
    const crime = await prisma.crimes.findUnique({
        where: {
            crime_number: req.params.crime_number
        }
    })
    if (crime === null){
        res.sendStatus(404)
        return
    }
    res.send(crime)
})


app.post('/api/v1/crimes', async (req,res)=>{
    let crime_number = await prisma.criminal.findUnique({ 
        where: {
            id: req.body.criminal_id
        },
    })
    if (crime === null){  //validación
        res.send(404)
        return
    }

    let crime = await prisma.crimes.create({
        data: {
            criminal_id: req.body.criminal_id,
            description: req.body.description,
            date: req.body.date,
            court_ruling: req.body.court_ruling
        }
    })
    res.send(crime)
})

app.delete('/api/v1/crimes/:crime_number', async  (res,req)=>{

    let crime = await prisma.crimes.findUnique({
        where: {
            crime_number: parseInt(req.params.crime_number)
        },
    })
    if (crime === null){
        res.sendStatus(404)
        return
    }
    await prisma.crimes.delete({
        where: {
            crime_number: req.params.crime_number
        },    
    })
    res.send(crime)
})

app.put('/api/v1/crimes/:crime_number', async (req,res)=>{
    const crime = await prisma.crimes.findUnique({
        where: {
            crime_number: parseInt(req.params.crime_number)
        },
    })
    if (crime === null){
        res.sendStatus(404)
        return
    }


    if (req.body.criminal_id !== null){
        let criminal = await prisma.criminal.findUnique({
            where: {
                id: req.body.criminal_id
            }
        })
        if (criminal === null){
            res.sendStatus(404)
            return
        }
    }

    await prisma.crimes.update({
        where: {
            crime_number: req.params.crime_number
        },
        data: {
            criminal_id: req.body.criminal_id,
            crime_number: req.body.crime_number,
            description: req.body.description,
            date: req.body.date,
            court_ruling: req.body.court_ruling,
        }
    })

    res.send(crime)
})




///////////////////////////// Cárceles  /////////////////////////////


app.get('/api/v1/jails', async (req, res)=>{
    const jails = await prisma.jails.findMany()
    res.send(jails)
})


app.get('/api/v1/jails/:jail_number', async (req, res)=>{
    const jail = await prisma.jails.findUnique({
        where: {
            jail_number: parseInt(req.params.jail_number)
        }
    })
    if (jail === null) {
        res.send(404)
        return
    }
    res.send(jail)
})

app.delete('/api/v1/jails/:jail_number', async (req,res)=>{
    const jail = await prisma.jails.findUnique({
        where: {
            jail_number: parseInt(req.params.jail_number)
        }
    })
    if (jail === null) {
        res.send(404)
        return
    }
    await prisma.jails.delete({
        where: {
            jail_number: parseInt(req.params.jail_number)
        }
    })
    res.send(jail)
})


app.put('/api/v1/jails/:jail_number', async (req,res)=>{
    let jail = await prisma.jails.findUnique({
        where: {
            jail_number: parseInt(req.params.jail_number)
        }
    })
    if (jail === null) {
        res.send(404)
        return
    }


    await prisma.jails.update({
        where: {
            jail_number: parseInt(req.params.jail_number)
        },
        data: {
            floor: req.body.floor,
            capacity: req.body.capacity
        }
    })
    res.send(jail)
})


app.post('/api/v1/jails', async (req,res)=>{
    const jail = await prisma.jails.create({
        data: {
            floor: req.body.floor,
            capacity: req.body.capacity
        }
    })
    res.send(jail)
})





app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})
