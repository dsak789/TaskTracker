const mongoose = require('mongoose')
require('dotenv').config()

mongoUrl = process.env.MONGO_URL
const conDB = async () =>{       
    await mongoose.connect(mongoUrl)
    .then(()=>{
        console.log("MONGODB Connected")
    })
    .catch((err)=>{
        console.log(`MONGODB not Connected... Error: ${err}`)
    })
}

module.exports = conDB;