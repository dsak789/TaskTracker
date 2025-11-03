import axios from "axios";
import {
  changepasswordPromise,
  ChangePasswordReq,
  LoginPromise,
  LoginReq,
  RegisterPromise,
  RegisterReq,
  RegisterRes,
} from "../utils/Interfaces-Types";

const token = localStorage.getItem("token");

export const AddUser = async (payload: RegisterReq): RegisterPromise => {
  return await axios
    .post<RegisterRes>(
      "https://tasktrackerapinv2.vercel.app/api/v2/user/adduser",
      payload
    )
    .then((res) => {
      return res.data;
    })
    .catch((er: any) => er.response.data);
};

export const LoginUser = async (payload: LoginReq): LoginPromise => {
  return await axios
    .post("https://tasktrackerapinv2.vercel.app/api/v2/user/login", payload)
    .then((res) => {
      return res.data;
    })
    .catch((er) => er.response.data);
};

export const ChangePassword = async (
  payload: ChangePasswordReq
): changepasswordPromise => {
  return await axios
    .post(
      "https://tasktrackerapinv2.vercel.app/api/v2/user/changepassword",
      payload,
      { headers: { Authorization: `Bearer ${JSON.parse(token || "")}` } }
    )
    .then((res) => res.data)
    .catch((er) => er.response.data);
};
