const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connDB = require('./db/dbConfig') 
const app =express()
app.use(express.json())
app.use(cors())
connDB()


const UserRouter = require('./routes/UserRouter')


app.use('/user',UserRouter)



app.get('/',async (req,res)=>{
    res.json("NODEv2 API Running...")
})


app.listen(process.env.PORT,()=>{
    console.log("Server of NODEv2 Started")
})