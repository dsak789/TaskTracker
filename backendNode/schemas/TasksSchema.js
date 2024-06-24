const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
    {
        id : String,
        userid: String,
        title : String,
        description : String,
        status : String,
        adddate : String
    }
)
module.exports = mongoose.model('Tasks',taskSchema)