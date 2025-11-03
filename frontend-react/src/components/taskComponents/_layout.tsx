import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Button } from "../commonComponents/";
import { MdAdd, MdArchive, MdCheck, MdLogout, MdPending } from "react-icons/md";

const _TaskLayout = () => {
  const { state, dispatch } = useAuth();
  const { user } = state;
  return (
    <div>
      <nav className="task-nav-bar sticky top-0 bg-gray-900 text-cyan-600 font-bold flex flex-row justify-around py-2 font-[courier]">
        <NavLink
          to={"pending"}
          className={({ isActive }) =>
            `task-menu-item bg-gray-700/80  ${
              isActive ? "bg-orange-900 text-orange-500" : "hover:bg-gray-800"
            }`
          }
        >
          <MdPending size={25} />
          Pending Tasks
        </NavLink>
        <NavLink
          to={"completed"}
          className={({ isActive }) =>
            `task-menu-item bg-gray-700/80  ${
              isActive ? "bg-green-900 text-green-500" : "hover:bg-gray-800"
            }`
          }
        >
          <MdCheck size={25} />
          Completed Tasks
        </NavLink>
        <NavLink
          to={"newtask"}
          className={({ isActive }) =>
            `task-menu-item bg-gray-700/80  ${
              isActive ? "bg-stone-900 text-stone-500" : "hover:bg-gray-800"
            }`
          }
        >
          <MdAdd size={25} />
          Add Task
        </NavLink>
        <NavLink
          to={"archieved"}
          className={({ isActive }) =>
            `task-menu-item bg-gray-700/80  ${
              isActive ? "bg-orange-950/80 text-amber-500" : "hover:bg-gray-800"
            }`
          }
        >
          <MdArchive size={25} />
          Archieved Tasks
        </NavLink>
        <NavLink
          to={"profile"}
          className={({ isActive }) =>
            `task-menu-item bg-gray-700/80 relative group inline-block ${
              isActive ? "bg-neutral-400 text-orange-500" : "hover:bg-gray-800"
            }`
          }
        >
          {/* {(user?.name.split(" ")[0]) || "Achiever"} */}
          <img
            src={user?.dp_url}
            alt={user?.name}
            className="h-10 w-10 rounded-full "
          />
          <div className="absolute hidden group-hover:block -right-5 top-13 w-40">
            <Button
              type="button"
              variant="error"
              label={`LOGOUT`}
              icon={<MdLogout size={20} />}
              onClick={() => {
                localStorage.removeItem("user");
                dispatch({ type: "LOGOUT" });
              }}
            />
          </div>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default _TaskLayout;
