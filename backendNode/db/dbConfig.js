const mongoose = require('mongoose')
require('dotenv').config()

mongoUrl = process.env.MONGO_URL
const conDB =async () =>{       
    await mongoose.connect(mongoUrl)
    .then(()=>{
        return("MONGODB Connected")
    })
    .catch((err)=>{
        return(`MONGODB not Connected... Error: ${err}`)
    })
}

module.exports = conDB;