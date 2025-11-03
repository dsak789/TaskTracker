import { MdSync } from "react-icons/md";
import { useFetch } from "../../hooks";
import {
  LoadingIndicator,
  NoTasks,
  SessionValidate,
  TaskCard,
} from "../commonComponents";

const PendingTasks = () => {
  const { data, isLoading, refetch, isRefetching } = useFetch("Pending");
  if (data?.message.includes("Unauthorized")) {
    const message = data?.message.includes("missing") ? "missing" : "expired";
    return <SessionValidate message={message} />;
  }
  return (
    <div className="flex flex-col bg-slate-700 min-h-screen items-center">
      <div className="flex items-center">
        <h1
          className="text-stone-500 text-center text-3xl font-[courier] border-l-2 border-r-2 
        rounded-bl-2xl rounded-tr-2xl p-2 m-4 text-shadow-sm text-shadow-white "
        >
          Pending Tasks
        </h1>
        <span
          onClick={() => refetch()}
          className="flex flex-col justify-center items-center font-bold text-stone-500 text-shadow-xs text-shadow-white cursor-pointer"
        >
          <MdSync
            size={23}
            className={
              isRefetching ? "animate-spin text-red-500" : "text-stone-300 "
            }
          />{" "}
          {isRefetching ? "Syncing.." : "Sync"}
        </span>
      </div>
      {isLoading && <LoadingIndicator />}
      {data?.Tasks.map((item) => (
        <div key={item._id}>
          <TaskCard {...item} />
        </div>
      ))}
      {!data?.Tasks.length && !isLoading && <NoTasks />}
    </div>
  );
};

export default PendingTasks;
