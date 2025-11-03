import { AuthState, AuthAction } from "../Interfaces-Types";

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const ls_user = localStorage.getItem("user");
const ls_token = localStorage.getItem("token");
if (ls_user) {
  initialAuthState.user = JSON.parse(ls_user);
  initialAuthState.token = ls_token;
}

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.user.token ?? null,
        loading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
