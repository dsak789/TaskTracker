import { useEffect, useState } from "react";
import "../../App.css";
import { FiUserCheck } from "react-icons/fi";
import {
  MdAdminPanelSettings,
  MdError,
  MdMood,
  MdWarning,
} from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { TMProps } from "../../utils/Interfaces-Types";

const ToastMessage = (ops: TMProps): JSX.Element => {
  const [display, setDisplay] = useState(ops.display);
  // const [icon, setIcon] = useState();
  const Icon = (icontype: TMProps["icontype"]) => {
    switch (icontype) {
      case "registered":
        return <FiUserCheck size={25} />;
      case "loggedin":
        return <MdAdminPanelSettings size={25} />;
      case "error":
        return <MdError size={25} />;
      case "info":
        return <AiFillInfoCircle size={25} />;
      case "warning":
        return <MdWarning size={25} />;
      default:
        return <MdMood size={25} />;
    }
  };
  useEffect(() => {
    setDisplay(ops.display);
    if (ops.display) {
      const timer = setTimeout(() => {
        setDisplay(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [ops.display]);

  if (!display) return <></>;

  return (
    <div className={`toast-msg-div`}>
      {display && (
        <>
          <p className={`tm tm-` + ops.type}>
            {Icon(ops.icontype)}
            {ops.message}
          </p>
          {/* <button
            className="tm-close"
            type="reset"
            onClick={() => setDisplay(false)}
          >
            X
          </button> */}
        </>
      )}
    </div>
  );
};

export default ToastMessage;
