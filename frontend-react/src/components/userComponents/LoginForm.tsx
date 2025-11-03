import React, { useEffect, useState } from "react";
import { Button, ToastMessage } from "../commonComponents/";
import { VscSignIn } from "react-icons/vsc";
import { useAuth, usePost } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { LoginRes, TMProps } from "../../utils/Interfaces-Types";
const LoginForm = () => {
  const { mutate, isPending, isSuccess, isError } = usePost("login");
  const { state, dispatch } = useAuth();
  const [tmessage, settMessage] = useState<{
    message: string;
    type: TMProps["type"];
    icontype?: TMProps["icontype"];
  } | null>(null);
  const [userData, setUserdata] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    !state.user ? "" : navigate(`/dashboard/${state.user?.username}`);
  }, [state.user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.username && !userData.password) {
      settMessage({
        type: "warning",
        message: "Enter Creds",
        icontype: "warning",
      });
      return false;
    }
    if (!userData.username) {
      settMessage({
        message: "Enter username",
        type: "warning",
        icontype: "warning",
      });
      return false;
    }
    if (!userData.password) {
      settMessage({
        message: "Enter password",
        type: "warning",
        icontype: "warning",
      });
      return false;
    }

    mutate(userData, {
      onSuccess: (data) => {
        const res = data as any; // need to be removed
        if (typeof res === "string") {
          dispatch({ type: "LOGIN_ERROR", payload: res });
          settMessage({ message: res, type: "error", icontype: "error" });
        } else {
          if (res.message.includes("Successfull")) {
            setUserdata({ username: "", password: "" });
            dispatch({ type: "LOGIN_SUCCESS", payload: res as LoginRes });
            const { user } = res as LoginRes;
            settMessage({
              message: res.message + " " + user.name,
              type: "success",
              icontype: "loggedin",
            });
          } else {
            dispatch({ type: "LOGIN_ERROR", payload: res.message });
            settMessage({
              message: res.message,
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
        dispatch({ type: "LOGIN_ERROR", payload: err.message });
        console.log("res err-->" + err);
      },
    });
  };

  return (
    <div className="login-form-div">
      <p
        className="text-cyan-500 text-center text-3xl font-[courier] border-l-2 border-r-2 
      rounded-bl-2xl rounded-tr-2xl p-2 m-4 text-shadow-xs text-shadow-white "
      >
        Task Tracker SignIn
      </p>
      <form className="login-form">
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Button
          label={isPending ? "Loging in.." : "SignIn"}
          type="submit"
          variant="primary"
          disabled={isPending}
          onClick={handleSubmit}
          icon={<VscSignIn />}
        />

        <Link to={"/signup"} className="link">
          Don't have an account..? SignUp
        </Link>

        <ToastMessage
          message={tmessage?.message}
          type={tmessage?.type || "info"}
          display={isSuccess || isError}
          icontype={tmessage?.icontype}
        />
      </form>
    </div>
  );
};

export default LoginForm;
