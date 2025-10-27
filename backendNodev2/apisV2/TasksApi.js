const Task = require("../models/TasksSchema");

exports.addTask = async (req, res) => {
  try {
    const task = req.body;
    const insert = new Task(task);
    await insert.save();
    res.json({ message: "Task Added Successfully" });
  } catch (error) {
    return res.status(400).json({
      message: "Task Not added.",
      err: error.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json({
      message: "All Users Tasks",
      tasks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Tasks Not Retrived",
      errr: error.message,
    });
  }
};

exports.getUserTasks = async (req, res) => {
  const { username } = req.user;
  try {
    const tasks = await Task.aggregate([
      {
        $match: {
          userid: username,
          status: { $in: ["Todo", "In Progress"] },
        },
      },
      {
        $addFields: {
          sortDate: { $ifNull: ["$updatedon", "$adddate"] }, // uses adddate if updatedon is missing
        },
      },
      { $sort: { sortDate: -1, _id: -1 } },
    ]);

    return res.json({
      message: "Data Retrieved",
      message1: `Tasks of ${username}`,
      Tasks: tasks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Tasks Not Retrived",
      errr: error.message,
    });
  }
};

exports.completedTasks = async (req, res) => {
  try {
    const userid = req.user.username;
    const tasks = await Task.aggregate([
      { $match: { userid: userid, status: "Completed" } },
      { $sort: { updatedon: -1, _id: 1 } },
    ]);
    return res.json({
      message: `Data Retrieved`,
      message1: `Completed Tasks of ${userid}`,
      Tasks: tasks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "No Tasks Retrieved",
      err: error.message,
    });
  }
};

exports.archievedTasks = async (req, res) => {
  try {
    const userid = req.user.username;
    const tasks = await Task.aggregate([
      { $match: { userid: userid, status: "Archieve" } },
      { $sort: { updatedon: -1, _id: -1 } },
    ]);
    return res.json({
      message: `Data Retrieved`,
      message1: `Archieved Tasks of ${userid}`,
      Tasks: tasks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "No Tasks Retrieved",
      err: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const utcdt = new Date();
    const ist = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const dt = new Date(utcdt.getTime() + ist);

    const updt = `${dt.getFullYear()}-${
      dt.getMonth() + 1
    }-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`;

    const { taskid, taskStatus } = req.params;

    const username = req.user.username;
    const task = await Task.findOne({ id: taskid });
    if (!task) {
      return res.status(400).json({
        message: "No Task Found",
      });
    }
    if (task.userid !== username) {
      return res.status(403).json({
        message:
          "You cannot access, modify or delete other's Task or activities",
      });
    }
    const update = await Task.updateOne(
      { id: taskid },
      { $set: { status: taskStatus, updatedon: updt } }
    );
    if (update.modifiedCount == 1) {
      return res.json({
        message: `Task updated to ${taskStatus} Successfully`,
      });
    } else {
      return res.status(400).json({
        message: "Task Not Updated",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Task not Updated",
      err: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskid = req.params.taskid;
    const username = req.user.username;
    const task = await Task.findOne({ id: taskid });
    if (!task) {
      return res.status(400).json({
        message: "No Task Found",
      });
    }
    if (task.userid !== username) {
      return res.status(403).json({
        message:
          "You cannot access, modify or delete other's Task or activities",
      });
    }

    const remove = await Task.deleteOne({ id: taskid });
    if (remove.deletedCount == 1) {
      return res.json({
        message: "Task Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Task Not Deleted",
      err: error.message,
    });
  }
};
