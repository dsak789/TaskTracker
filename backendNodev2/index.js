const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connDB = require("./db/dbConfig");
const app = express();
app.use(express.json());
app.use(cors());
connDB();

const UserRouter = require("./routes/UserRouter");
const TaskRouter = require("./routes/Tasksouter");
const UserRouterV2 = require("./routes/UserRouterV2");
const TaskRouterV2 = require("./routes/TasksouterV2");

app.use("/user", UserRouter);
app.use("/api/v2/user", UserRouterV2);
app.use("/task", TaskRouter);
app.use("/api/v2/task", TaskRouterV2);

app.get("/", async (req, res) => {
  res.json("NODEv2 API Running...");
});

app.listen(process.env.PORT, () => {
  console.log("Server of NODEv2 Started at 8888");
});
