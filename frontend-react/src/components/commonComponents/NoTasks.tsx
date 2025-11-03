import { PiSmileyMeltingFill } from "react-icons/pi";

const NoTasks = () => {
  return (
    <div>
      <h1 className="flex flex-col items-center font-bond text-2xl text-stone-400">
        <PiSmileyMeltingFill size={70} />
        No Tasks Found
      </h1>
    </div>
  );
};

export default NoTasks;
