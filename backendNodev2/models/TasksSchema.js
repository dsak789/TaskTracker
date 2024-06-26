const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
    {
        id : {
            type:String,
            required:true,
        },
        userid: {
            type:String,
            required:true,
        },
        title : {
            type:String,
            required:true,
        },
        description : {
            type:String,
            required:true,
        },
        status : {
            type:String,
            required:true,
        },
        adddate : {
            type:String,
            required:true,
        }
    }
)
module.exports = mongoose.model('Tasks',taskSchema)