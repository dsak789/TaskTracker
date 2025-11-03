import React, { useState } from "react";
import { Button, ToastMessage } from "../commonComponents/";
import { useAuth, usePost } from "../../hooks";
import { ChangepasswordRes, TMProps } from "../../utils/Interfaces-Types";

const ChangePassword = () => {
  const { state } = useAuth();
  const { mutate, isPending, isSuccess, isError } = usePost("chpwd");
  const [disp, setDisp] = useState(false);
  const [passwords, setPasswords] = useState({
    username: state.user?.username || "",
    oldPassword: "",
    newPassword: "",
    confirmpassword: "",
  });
  const [tm, setTm] = useState<{
    message: string;
    type: TMProps["type"];
    icontype?: TMProps["icontype"];
  } | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setDisp(false);
  };
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmpassword
    ) {
      setDisp(true);
      setTm({
        message: "Please enter password",
        type: "info",
        icontype: "info",
      });
      return false;
    }
    if (passwords.oldPassword === passwords.newPassword) {
      setDisp(true);
      setTm({
        message: "Old password and New password should not be same",
        type: "warning",
        icontype: "warning",
      });
      return false;
    }
    if (passwords.newPassword !== passwords.confirmpassword) {
      setDisp(true);
      setTm({
        message: "New Password mismatch",
        type: "warning",
        icontype: "warning",
      });
      return false;
    }

    mutate(passwords, {
      onSuccess: (data) => {
        if (typeof data === "string") {
          setTm({ message: data, type: "error", icontype: "error" });
        } else {
          const { message } = data as ChangepasswordRes;
          if (message.includes("Changed")) {
            setTm({ message: message, type: "success" });
            setPasswords({
              ...passwords,
              newPassword: "",
              oldPassword: "",
              confirmpassword: "",
            });
          } else {
            setTm({ message: message, type: "success" });
          }
        }
      },
      onError: (err) => {
        setTm({ message: err.message, type: "error" });
        console.log(err.message);
      },
    });
  };

  return (
    <div>
      <form className="ch-pwd-form relative">
        <input
          name="oldPassword"
          type="password"
          placeholder="Enter Old Password"
          value={passwords.oldPassword}
          onChange={handleChange}
        />
        <input
          name="newPassword"
          type="password"
          placeholder="Enter New Password"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <input
          name="confirmpassword"
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirmpassword}
          onChange={handleChange}
        />
        <Button
          label={isPending ? "Password Changing.." : "Change Password"}
          type="submit"
          variant="warning"
          onClick={handleSumbit}
        />
        <ToastMessage
          message={tm?.message}
          type={"warning"}
          icontype="info"
          display={disp || isSuccess || isError}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
