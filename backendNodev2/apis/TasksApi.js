const Task = require('../models/TasksSchema')

exports.getTasks = async (req,res) => {
    try {
        const tasks = await Task.find()
        res.json({
            message:"All Users Tasks",
            tasks
        })
    } catch (error) {
        res.status(400).json({
            message:"Tasks Not Retrived",
            errr:error
        })
    }
}