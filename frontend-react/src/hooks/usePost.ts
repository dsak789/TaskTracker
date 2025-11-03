import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddUser,
  LoginUser,
  ChangePassword,
  getTasks,
  newTask,
} from "../services";
import {
  ChangePasswordReq,
  LoginReq,
  LoginRes,
  RegisterReq,
  Task,
} from "../utils/Interfaces-Types";

export interface TaskUpdate {
  taskId: string;
  status: string;
}
export type usepostType =
  | LoginReq
  | RegisterReq
  | ChangePasswordReq
  | Task
  | TaskUpdate;

export const usePost = (
  type: "login" | "register" | "chpwd" | "update" | "newTask"
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: usepostType) => {
      if (type === "register") return await AddUser(payload as RegisterReq);
      else if (type === "login") return await LoginUser(payload as LoginReq);
      else if (type === "update")
        return await getTasks("Update", payload as TaskUpdate);
      else if (type === "newTask") return await newTask(payload as Task);
      else return await ChangePassword(payload as ChangePasswordReq);
    },
    onSuccess: (data) => {
      if (type === "login") {
        const res = data as LoginRes;
        if (res.message.includes("Successfull")) {
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.user.token));
        }
      } else if (type === "update" || type === "newTask") {
        queryClient.invalidateQueries(["Pending", "Archived"] as any);
        return data;
      } else {
        return data as LoginRes;
      }
    },
  });
};
