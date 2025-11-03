import React, { useState } from "react";
import { Button, ToastMessage } from "../commonComponents/";
import { VscSignIn } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { usePost } from "../../hooks";
import { TMProps } from "../../utils/Interfaces-Types";
const AddUserForm = () => {
  const { mutate, isPending, isSuccess } = usePost("register");
  const [tmessage, settMessage] = useState<{
    message: string;
    type: TMProps["type"];
    icontype?: TMProps["icontype"];
  } | null>(null);
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    githubid: "",
    username: "",
    password: "",
    cnfpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(userData, {
      onSuccess: (res) => {
        if (typeof res === "string") {
          settMessage({ type: "error", message: res, icontype: "error" });
        } else {
          if (res.message.includes("Success")) {
            setUserdata({
              name: "",
              email: "",
              githubid: "",
              username: "",
              password: "",
              cnfpassword: "",
            });
            settMessage({
              type: "success",
              message: res.message,
              icontype: "registered",
            });
          } else {
            settMessage({
              type: "warning",
              message: res.message,
              icontype: "warning",
            });
          }
        }
      },
      onError: (err) => console.log("res err-->" + err),
    });
  };
  return (
    <div className="add-form-div">
      <p
        className="text-cyan-500 text-3xl text-center font-[courier] border-l-2 border-r-2 
      rounded-bl-2xl rounded-tr-2xl p-2 m-4 text-shadow-xs text-shadow-white"
      >
        Task Tracker SignUp
      </p>
      <form className="add-form">
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <input
          type="mail"
          placeholder="Enter Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Github Username"
          name="githubid"
          value={userData.githubid}
          onChange={handleChange}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="cnfpassword"
          value={userData.cnfpassword}
          onChange={handleChange}
        />
        <Button
          label={isPending ? "Registering..." : "SignUp"}
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          disabled={isPending}
          icon={<VscSignIn />}
        />
        <Link to={"/signin"} className="link">
          Have an account..? Signin
        </Link>

        <ToastMessage
          message={tmessage?.message}
          type={tmessage?.type || "info"}
          display={isSuccess}
          icontype={tmessage?.icontype}
        />
      </form>
    </div>
  );
};

export default AddUserForm;
