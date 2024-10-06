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

exports.getUserTasks = async (req,res) => {
    try {
        const userid = req.params.userid
        const tasks = await Task.aggregate([{'$match':{'userid':userid,'status':{'$in':['Todo','In Progress']}}},{'$sort':{'updatedon':-1,'_id':-1}}])
        res.json({
            message:"Data Retrieved",
            message1:`Tasks of ${userid}`,
            Tasks:tasks
        })
    } catch (error) {
        res.status(400).json({
            message:"Tasks Not Retrived",
            errr:error
        })
    }
}


exports.completedTasks = async (req,res) => {
    try {
        const userid = req.params.userid
        const tasks = await Task.aggregate([{'$match':{'userid':userid,'status':'Completed'}},{'$sort':{'updatedon':-1,'_id':1}}])
        res.json({
            message:`Data Retrieved`,
            message1:`Completed Tasks of ${userid}`,
            Tasks:tasks
        })
    } catch (error) {
        res.status(400).json(
            {
                message:"No Tasks Retrieved",
                err: error
            }
        )
    }
}


exports.archievedTasks = async (req,res) => {
    try {
        const userid = req.params.userid
        const tasks = await Task.aggregate([{'$match':{'userid':userid,'status':'Archieve'}},{'$sort':{'updatedon':-1,'_id':-1}}])
        res.json({
            message:`Data Retrieved`,
            message1:`Archieved Tasks of ${userid}`,
            Tasks:tasks
        })
    } catch (error) {
        res.status(400).json(
            {
                message:"No Tasks Retrieved",
                err: error
            }
        )
    }
}

exports.updateTask =  async (req,res) => {
    try {
        const dt = new Date()
        const updt = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`
        const {taskid, taskStatus } = req.params
        const update = await Task.updateOne({'id':taskid},{'$set':{'status':taskStatus,'updatedon':updt}})
        if (update.modifiedCount == 1){
            res.json({
                message:`Task updated to ${taskStatus} Successfully`
                
            })
        }
        else{
            res.status(400).json({
                message:"Task Not Updated"
            })
        }
    } catch (error) {
        console.warn(error)
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