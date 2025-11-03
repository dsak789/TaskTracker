import { useContext } from "react";
import { AuthContext } from "../utils/contextProviders/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("useAuth must be within an provider");
    throw new Error("useAuth must be within an provider");
  }
  return context;
};