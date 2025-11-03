import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../hooks";

const SessionValidate = (props: any) => {
  const { dispatch } = useAuth();
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-slate-900">
      <p className="flex gap-10 items-center relative font-bold text-red-500 text-3xl font-[mono] animate-pulse">
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-5000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-3000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-1000"></div>
        403 - Page Access forbidden
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-1000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-3000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-5000"></div>
      </p>

      <p className="flex gap-10 items-center relative font-bold text-red-500 text-3xl font-[mono] animate-pulse">
        {props.message === "expired"
          ? "Seesion Expired Please LOGIN again"
          : "Access denied Please relogin"}
      </p>
      <Link to={"/"}>
        <Button
          type="button"
          label="Home (or) Login"
          variant="secondary"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
          }}
        />
      </Link>
    </div>
  );
};

export default SessionValidate;
