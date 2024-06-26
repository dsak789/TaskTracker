const mongoose = require('mongoose')
require('dotenv').config()

mongoUrl = process.env.MONGO_URL || "mongodb+srv://sbcreations:sbcreations@cluster0.ao6t0sl.mongodb.net/tasktracker?"
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