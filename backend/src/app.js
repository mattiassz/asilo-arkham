
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Arkham Asylum')
})

app.listen(port, () => {
  console.log(`Arkham app listening on port ${port}`)
})

