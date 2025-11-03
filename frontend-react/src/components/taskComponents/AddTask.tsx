import React, { useState } from "react";
import { Button, LoadingIndicator, ToastMessage } from "../commonComponents/";
import { useAuth, usePost } from "../../hooks";
import { v4 } from "uuid";
import { Task, TasksRes, TMProps } from "../../utils/Interfaces-Types";
import { MdAdd } from "react-icons/md";

const AddTask: React.FC = () => {
  const { state } = useAuth();
  const { mutate, isPending, isSuccess, isError } = usePost("newTask");
  const [tmessage, settMessage] = useState<{
    message: string;
    type: TMProps["type"];
    icontype?: TMProps["icontype"];
  } | null>(null);
  const date = new Date();
  const [newTask, setNewTask] = useState<Task>({
    id: v4(),
    userid: state?.user?.username ?? "",
    title: "",
    description: "",
    status: "Todo",
    adddate: date.toISOString(),
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      settMessage({
        message: "Please enter a task title!",
        type: "warning",
        icontype: "warning",
      });
      return false;
    }
    mutate(newTask, {
      onSuccess: (data) => {
        const res = data as TasksRes;
        if (typeof res === "string") {
          settMessage({ message: res, type: "error", icontype: "error" });
        } else {
          if (res.message.includes("Successfull")) {
            settMessage({
              message: res.message,
              type: "success",
              icontype: "loggedin",
            });

            setNewTask({
              id: v4(),
              userid: state?.user?.username ?? "",
              title: "",
              description: "",
              status: "Todo",
              adddate: date.toISOString(),
            });
          } else {
            if (res.message.includes("expired")) {
              settMessage({
                message: "Session Expired! Please login again",
                type: "error",
                icontype: "error",
              });
            } else
              settMessage({
                message: "Invalid User details ! Please login again",
                type: "error",
                icontype: "error",
              });
          }
        }
      },
      onError: (err) => {
        settMessage({
          message: err.message,
          type: "error",
          icontype: "error",
        });
      },
    });
  };

  return (
    <div className="relative flex flex-col bg-slate-700  min-h-screen items-center">
      <div className="flex items-center">
        <h1
          className="text-stone-500 text-center text-3xl font-[courier] border-l-2 border-r-2 
        rounded-bl-2xl rounded-tr-2xl p-2 m-4 text-shadow-sm text-shadow-white "
        >
          New Task
        </h1>
      </div>
      {isPending && <LoadingIndicator />}
      <div className="relative bg-gray-800 p-4 rounded-xl mb-6 shadow-sm shadow-white">
        <h2 className="text-lg mb-2 text-cyan-300">Add a New Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full mb-2 p-2 rounded bg-gray-700 text-white"
        />
        <Button
          label={isPending ? "Adding..." : "Add Task"}
          variant="primary"
          onClick={handleAddTask}
          icon={<MdAdd />}
        />
      </div>
      <ToastMessage
        message={tmessage?.message}
        type={tmessage?.type || "info"}
        display={isSuccess || isError}
        icontype={tmessage?.icontype}
      />
    </div>
  );
};

export default AddTask;
