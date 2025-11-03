import React from "react";

export interface User {
  _id: number;
  name: string;
  email: string;
  githubid?: string;
  username: string;
  password: string;
}

export type RegisterReq = Omit<User, "_id">;

export interface RegisterRes {
  message: string;
  user: RegisterReq;
}

export type LoginReq = Pick<User, "username" | "password">;

export interface LoginRes {
  message: string;
  user: Omit<RegisterReq, "password"> & { dp_url: string; token?: string };
}

export interface ChangePasswordReq {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export interface ChangepasswordRes {
  message: string;
  details: User & { _id: string; _v: number };
}

export type RegisterPromise = Promise<RegisterRes | string>;
export type LoginPromise = Promise<LoginRes>;
export type changepasswordPromise = Promise<ChangepasswordRes>;

export interface AuthState {
  user: LoginRes["user"] | null;
  token?: string | null;
  loading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: LoginRes }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" };

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

//ToastMessage
export interface TMProps {
  message: string | any;
  type: "success" | "error" | "warning" | "info";
  icontype?: "registered" | "loggedin" | "error" | "warning" | "info";
  display: boolean;
}

export type TaskStatus =
  | "Todo"
  | "In Progress"
  | "Completed"
  | "Archieve"
  | "Delete";
  
export interface Task {
  id: string;
  userid: string;
  title: string;
  description: string;
  status: TaskStatus;
  adddate: string;
}

export interface AllTasks extends Task {
  updatedon: string;
  _id: string;
  _v: number;
}

export interface TasksRes {
  message: string;
  message1: string;
  Tasks: AllTasks[];
}
export type AddTaskRes = Pick<TasksRes, "message">;
export type TaskPromise = Promise<TasksRes>;

export interface TaskCardProps {
  task: AllTasks;
  onStatusChange?: (id: string, newStatus: string) => void;
}
export interface TaskUpdateButtonProps {
  task: AllTasks;
  onStatusChange?: (id: string, newStatus: string) => void;
}
