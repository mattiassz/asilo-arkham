const express = require('express')
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('ñarkham')
})

PUERTO = 3000
app.use(express.json())
app.listen(PUERTO)
console.log("escuchando en el puerto 3000");


