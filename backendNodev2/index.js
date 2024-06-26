const express = require('express')
const cors = require('cors')
const app =express()
app.use(cors())

app.get('/',(req,res)=>{
    res.json("NODEv2 API Running...")
})


app.listen(8888,()=>{
    console.log("Server of NODEv2 Started")
})