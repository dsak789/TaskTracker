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


app.use('/user',UserRouter)
app.use('/task/',TaskRouter)
app.get('/',(req,res)=>{
    try {
        res.json(`Task Tracker API Working `)        
    } catch (error) {
        res.status(500).json(`Server Down Due to ${error}`)
    }
})

app.listen(port,()=>{
    try {
        console.log(`Task Tracker API Server running on PORT:${port}`)
        conDB()
    } catch (error) {
        console.log(`Server not started due to ${error}`)
    }
})