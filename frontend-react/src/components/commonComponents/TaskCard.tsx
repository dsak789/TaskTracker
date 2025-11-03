import { AllTasks } from "../../utils/Interfaces-Types";
import TaskUpdateButton from "./TaskUpdateButton";

const TaskCard = (task: AllTasks) => {
  const statusClasses: Record<string, string> = {
    Completed: "bg-green-900/70 text-green-300 ",
    Todo: "bg-yellow-900/70 text-yellow-300",
    InProgress: "bg-orange-900/70 text-orange-300",
  };

  return (
    <div
      className="bg-gray-800 w-full max-w-3xl mx-auto 
                 p-4 my-3 rounded-xl border border-gray-700 shadow-md 
                 hover:shadow-cyan-700/30 transition-all duration-300"
    >
      {/* Responsive Grid Layout */}
      <div
        className="grid grid-cols-1 sm:grid-cols-[3fr_2fr_1fr] gap-4 
                   items-center"
      >
        <div>
          <h3 className="text-cyan-400 font-semibold text-lg mb-1 break-words">
            {task?.title}
          </h3>
          <p className="text-gray-300 text-sm leading-snug break-words">
            {task?.description}
          </p>
        </div>

        <div className="text-gray-400 text-xs sm:text-sm space-y-0.5 text-left sm:text-right">
          <p>
            <span className="font-medium text-gray-300">Updated:</span>{" "}
            {task?.updatedon ?? "Not updated yet"}
          </p>
          <p>
            <span className="font-medium text-gray-300">Added:</span>{" "}
            {task?.adddate}
          </p>
        </div>

        <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2">
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold capitalize
              ${statusClasses[task.status] || "bg-gray-700 text-gray-300"}`}
          >
            {task?.status}
          </span>

          {task.status !== "Completed" && <TaskUpdateButton {...task} />}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
