const express = require('express')
const router = express.Router()

const tasks = require('../apis/TasksApi')

router.post('/addtask',tasks.addTask)
router.get('/tasks',tasks.getTasks)
router.get('/tasks/:userid',tasks.getUserTasks)
router.get('/completed-tasks/:userid',tasks.completedTasks)
router.get('/archieved-tasks/:userid',tasks.archievedTasks)
router.get('/updatetask/:taskid/:taskStatus',tasks.updateTask)
router.get('/deletetask/:taskid',tasks.deleteTask)

module.exports = router