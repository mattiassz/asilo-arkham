const express = require('express')
const app = express()
const port = 3000;
app.use(express.json())

let criminales = [
    {
        id: 1,
        name: "Pablo Escobar", 
        alias: "EL chapo",
        crime: "chad",
        age: 30,
        sex: "M",
        treatment: "Tratamiento Hormonal",
        dangerousness: "Muy Alto",
        
    }
]
let delitos = []
let celdas = []
let staff = []


app.get("/", (req,res)=>{
    res.send("Batman App")
})

app.get('/api/v1/criminals', (req,res)=>{
    res.json(criminales) //listar todos los criminales
})

app.get('/api/v1/criminals/:id', (req,res)=>{
    const criminal = criminales.find((element)=> element.id == req.params.id)


    if (criminal === undefined){
        res.sendStatus(404);
        return
    };

    res.json(criminal)
})


app.post('/api/v1/criminals'), (req,res)=>{
    const criminal = ({
        id: criminales.length + 1,
        name: req.body.name, 
        alias: req.body.alias,
        crime: req.body.crime,
        age: req.body.age,
        sex: req.body.sex,
        treatment: req.body.treatment,
        dangerousness: req.body.dangerousness,
    })
    criminales.send(criminal);
    res.sendStatus(201).send(criminal) //devolvemos el usuario creado
}


app.delete('/api/v1/criminals/:id'), (req,res)=>{
    const criminal = !(criminales.find((element)=>element.id = req.params.id) === undefined)
    if(criminal === undefined){
        res.sendStatus(404)
        return
    }
    criminales = criminales.filter((element)=> element.id !== req.params.id);
    res.send(criminal) //devolvemos el usuario borrado
}


app.put('/api/v1/criminals/:id'), (req,res)=>{
    let criminal_index = !(criminales.findIndex((element)=>element.id = req.params.id) === undefined)
    if(criminal_index === -1){ // -1 es igual a que no lo encontró
        res.sendStatus(404)
        return
    }

    criminales[criminal_index].name = req.body.name ?? user.name //si el usuario no cambia el nombre se le queda el mismo
    criminales[criminal_index].alias = req.body.alias ?? criminales[criminal_index].alias
    criminales[criminal_index].crime = req.body.crime ?? criminales[criminal_index].crime
    criminales[criminal_index].age = req.body.age ?? criminales[criminal_index].age
    criminales[criminal_index].treatment = req.body.treatment ?? criminales[criminal_index].treatment
    criminales[criminal_index].dangerousness = req.body.dangerousness ?? criminales.dangerousness

    res.send(criminales[criminal_index]) 
    
}


app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})


