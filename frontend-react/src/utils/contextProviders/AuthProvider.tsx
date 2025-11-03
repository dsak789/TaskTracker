import React, { createContext, ReactNode, useReducer } from "react";
import { AuthContextType } from "../Interfaces-Types";
import { authReducer, initialAuthState } from "../reducers/authReducer";
// import { parseJWT } from "../JWTParser";

interface AuthProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType>({
  state: initialAuthState,
  dispatch: () => {},
});

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // useEffect(() => {
  //   if (state.token) {
  //     const jwt = parseJWT(state.token);
  //     if (jwt.exp && jwt.exp * 1000 < Date.now()) {
  //       dispatch({ type: "LOGOUT" });
  //     }
  //   }
  // },[state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
