import axios from "axios";
import { Task, TaskPromise, TasksRes } from "../utils/Interfaces-Types";
import { TaskUpdate } from "../hooks/usePost";

export type TaskTypes =
  | "Pending"
  | "Completed"
  | "Archieved"
  | "Update"
  | "Delete";
const baseUrl = "https://tasktrackerapinv2.vercel.app/api/v2/task/";
const token = localStorage.getItem("token");

export const getTasks = async (
  type: TaskTypes,
  taskUpdata?: TaskUpdate
): TaskPromise => {
  const endPoints = {
    Pending: `${baseUrl}tasks/`,
    Completed: `${baseUrl}completed-tasks/`,
    Archieved: `${baseUrl}archieved-tasks/`,
    Update: `${baseUrl}updatetask/${taskUpdata?.taskId}/${taskUpdata?.status}`,
    Delete: `${baseUrl}archieved-tasks/`,
  };
  try {
    return await axios
      .get(endPoints[type], {
        headers: { Authorization: `Bearer ${JSON.parse(token || "")}` },
      })
      .then((res) => res.data)
      .catch((er) => er.response.data);
  } catch (err: any) {
    console.log(err.response.data);
    return {
      message: "No Info",
      message1: "Sorry for the inconvinience",
      Tasks: [],
    };
  }
};

export const newTask = async (task: Task) => {
  return await axios
    .post<TasksRes>(
      "https://tasktrackerapinv2.vercel.app/api/v2/task/addtask",
      task,
      { headers: { Authorization: `Bearer ${JSON.parse(token || "")}` } }
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((er) => er.response.data);
};
