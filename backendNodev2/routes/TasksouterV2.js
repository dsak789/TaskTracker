const express = require("express");
const router = express.Router();

const tasks = require("../apisV2/TasksApi");
const { authenticate } = require("../middlewares/authMiddle");

router.post("/addtask",authenticate, tasks.addTask);
router.get("/alltasks", authenticate, tasks.getTasks);
router.get("/tasks", authenticate, tasks.getUserTasks);
router.get("/completed-tasks/", authenticate, tasks.completedTasks);
router.get("/archieved-tasks/", authenticate, tasks.archievedTasks);
router.get("/updatetask/:taskid/:taskStatus", authenticate, tasks.updateTask);
router.get("/deletetask/:taskid", authenticate, tasks.deleteTask);

module.exports = router;
