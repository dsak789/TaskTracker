const express = require('express')
const router = express.Router()

const tasks = require('../apis/TasksApi')

router.post('/addtask',tasks.addTask)
router.get('/tasks',tasks.getTasks)

router.get('/deletetask/:taskid',tasks.deleteTask)

module.exports = router