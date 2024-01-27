const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000

app.get('/', (req, res) => {
  res.send("<h1>Welcome to my website/h1>")
})


const studentRoutes = require('./routes/studentRoutes')
const menuRoutes = require('./routes/menuRoutes')
const personRoutes = require('./routes/personRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/students', studentRoutes)
app.use('/menu', menuRoutes)
app.use('/person', personRoutes)
app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})