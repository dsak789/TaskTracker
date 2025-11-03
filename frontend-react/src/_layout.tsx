import { Navigate, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import Button from "./components/commonComponents/Button";
import { useAuth } from "./hooks";

const _layout = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  // if (state.user) {
  //   return navigate('/login')
  // }

  return (
    <div className="layout-div">
      {!state.user ? (
        <>
          <p className="text-cyan-500 text-6xl font-[courier] underline p-2">
            Task Tracker
          </p>
          <img src="/TaskTracker1024.png" height={500} width={250}/>
          <Button
            label="SignUp"
            onClick={() => navigate("/signup")}
            icon={<FiLogIn />}
            variant="secondary"
          />
          <Button
            label="SignIn"
            onClick={() => navigate("/signin", { replace: true })}
            icon={<FiLogIn />}
            variant="primary"
          />
        </>
      ) : (
        <Navigate to={`/dashboard/${state.user.username}`} replace />
      )}
    </div>
  );
};

export default _layout;
