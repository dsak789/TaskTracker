const Task = require('../models/TasksSchema')


exports.addTask = async (req,res) => {
    try {
        const task = req.body
        const insert =  new Task(task)
        await insert.save()
        res.json({message:"Task Added Successfully"})        
    } catch (error) {
        res.status(400).json({
            message:"Task Not added.",
            err:error
        })
    }
    
}

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








exports.updateTask =  async (req,res) => {
    try {
        const {taskid, taskStatus } = req.params
        const update = await Task.updateOne({'id':taskid},{'$set':{'status':taskStatus}})
        if (update.modifiedCount == 1){
            res.json({
                message:"Task updated Successfully"
            })
        }
        else{
            res.status(400).json({
                message:"Task Not Updated"
            })
        }
    } catch (error) {
        res.status(400).json({
            message:"Task not Updated",
            err:error
        })
    }
}




exports.deleteTask = async (req,res) => {
    try {
        const taskid = req.params.taskid
        const remove = await Task.deleteOne({'id':taskid})
        if(remove.deletedCount==1){
            res.json({
                message:"Task Deleted Successfully"
            })
        }
    } catch (error) {
        res.status(400).json({
            message:"Task Not Deleted",
            err:error
        })   
    }
}