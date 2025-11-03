// import React from "react";
import { useAuth } from "../hooks";
import { Navigate, Outlet } from "react-router-dom";

// interface PrivateProps {
//   children: JSX.Element;
// }

const PrivateRoutes = () => {
  const { state } = useAuth();
  return state.user ? <Outlet /> : <Navigate to={"/authentication"} replace />;
};
export default PrivateRoutes;
