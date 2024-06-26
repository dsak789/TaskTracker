const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app =express()
app.use(cors())

app.get('/',(req,res)=>{
    res.json("NODEv2 API Running...")
})


app.listen(process.env.PORT,()=>{
    console.log("Server of NODEv2 Started")
})