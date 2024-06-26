const express = require('express')
const router = express.Router()

const tasks = require('../apis/TasksApi')



router.get('/tasks',tasks.getTasks)



module.exports = router