import { MdLogout } from "react-icons/md";
import { useAuth } from "../../hooks";
import { Button } from "../commonComponents";
import { ChangePassword } from "./";
const Profile = () => {
  const { state, dispatch } = useAuth();
  return (
    <div className="flex flex-col gap-4 bg-slate-900/90 justify-center items-center">
      <p
        className="text-stone-500 text-center text-3xl font-[courier] border-l-2 border-r-2 
      rounded-bl-xl rounded-tr-xl p-2 m-4 text-shadow-xs text-shadow-white "
      >
        ! Hey {state.user?.name.split(" ")[0] || "Achiever"} !
      </p>
      <div className="profile-div flex flex-col font-[mono] bg-gray-700/80 p-3 h-fit w-100 justify-center items-center rounded-xl ">
        <img src={state.user?.dp_url} className="rounded-full size-50" />
        <p className="font-bold text-3xl text-stone-200">
          {state.user?.name || "Achiever"}
        </p>
        <p className="font-bold text-stone-400 text-xl">
          {state.user?.username}
        </p>
        <p className="font-bold text-stone-400 text-xl">
          Github:{" "}
          <a
            href={`https://github.com/${state.user?.githubid}`}
            target="_blank"
          >
            {state.user?.githubid}
          </a>
        </p>
        <p className="font-bold text-stone-400 text-xl">
          <a href={`mailto:${state.user?.email}`}>{state.user?.email}</a>
        </p>
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
      <div className="ch-pwd-div flex flex-col font-[mono] bg-gray-700/80 p-3 h-fit w-screen justify-center rounded-xl ">
        <h1 className="text-3xl text-">Change Password</h1>
        <ChangePassword />
      </div>
    </div>
  );
};

export default Profile;
