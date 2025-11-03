import { usePost } from "../../hooks";
import {
  AllTasks,
  TasksRes,
  TaskStatus,
  TMProps,
} from "../../utils/Interfaces-Types";
import { useState } from "react";
import ToastMessage from "./ToastMessage";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const TaskUpdateButton = (task: AllTasks) => {
  const [showOptions, setShowOptions] = useState(false);
  const { mutate, isSuccess } = usePost("update");
  const [tmessage, settMessage] = useState<{
    message: string;
    type: TMProps["type"];
    icontype?: TMProps["icontype"];
  } | null>(null);

  const statusOptions: TaskStatus[] =
    task?.status === "Todo"
      ? ["In Progress", "Completed", "Delete", "Archieve"]
      : task?.status === "Archieve"
      ? ["Todo", "In Progress", "Completed", "Delete"]
      : ["Todo", "Completed", "Delete", "Archieve"];

  const handleStatusClick = (status: TaskStatus) => {
    if (status === "Delete") {
      if (
        !confirm(
          "Sure you want delete this task! Instead you can archieve the task."
        )
      )
        return false;
    }
    try {
      mutate(
        { taskId: task.id, status },
        {
          onSuccess: (res) => {
            const { message } = res as TasksRes;
            settMessage({ message, type: "success", icontype: "info" });
            return res as TasksRes;
          },
        }
      );
    } catch (er) {
      console.log(er);
    }
    setShowOptions(false);
  };

  return (
    <>
      <ToastMessage
        message={tmessage?.message}
        type={isSuccess ? "success" : "error"}
        icontype={tmessage?.icontype}
        display={isSuccess}
      />
      <div className="relative inline-block text-left">
        <button
          onClick={() => setShowOptions((prev) => !prev)}
          className="flex flex-row items-center bg-cyan-600 hover:bg-cyan-700 text-white text-xs 
        px-3 py-1 rounded-md transition-all duration-200"
        >
          {"Update Status"}
          {!showOptions ? (
            <MdArrowDropDown size={18} color="black" />
          ) : (
            <MdArrowDropUp  size={18} color="black"/>
          )}
        </button>

        {showOptions && (
          <div
            className="absolute right-0 mt-2 w-36 bg-gray-800 border border-gray-700 
        rounded-md shadow-lg z-20"
          >
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusClick(status)}
                className="block w-full text-left px-3 py-2 text-sm 
            hover:bg-gray-700 text-gray-300"
              >
                {status}
              </button>
            ))}
            {task?.status !== "Archieve" && (
              <p className="text-[10px] text-yellow-400 text-center px-2 py-1 border-t border-gray-700">
                ⚠️ Deleted tasks can’t be retrieved. Use “Archieve” instead.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskUpdateButton;
