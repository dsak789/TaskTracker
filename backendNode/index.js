const express = require('express')
const cors = require('cors')
const conDB = require('./db/dbConfig')
require('dotenv').config()
const UserRouter = require('./routes/UserRoutes')
const TaskRouter = require('./routes/TasksRouter')

const app = express()
app.use(express.json())
app.use(cors())
port = process.env.PORT || 8888
conDB()


app.use('/user',UserRouter)
app.use('/task/',TaskRouter)
app.get('/',(req,res)=>{
    res.json(`Task Tracker API Working `)
})

app.listen(port,()=>{
    console.log(`Task Tracker API Server running on PORT:${port}`)
})