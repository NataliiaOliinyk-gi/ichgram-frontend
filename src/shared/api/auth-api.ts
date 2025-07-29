import backendInstance from "./instance";
import type { IUser } from "../../typescript/interfaces";

export interface IAuthResponse {
  token: string;
  refreshToken?: string;
  user: IUser;
}

export interface IRegisterPayload {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export const registerApi = async (
  payload: IRegisterPayload
): Promise<{ message: string }> => {
  const { data } = await backendInstance.post("auth/register", payload);
  return data;
};

export const verifyUserApi = async (
  code: string
): Promise<{ message: string }> => {
  const { data } = await backendInstance.post("/auth/verify", { code });
  return data;
};

export const loginUserApi = async (
  payload: ILoginPayload
): Promise<IAuthResponse> => {
  const { data } = await backendInstance.post("/auth/login", payload);
  backendInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
  return data;
};

export const getCurrentApi = async (
  token: string
): Promise<Omit<IAuthResponse, "refreshToken">> => {
  backendInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

  try {
    const { data } = await backendInstance.get("/auth/current");
    backendInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
    return data;
  } catch (error) {
    delete backendInstance.defaults.headers["Authorization"];
    throw error;
  }
};

export const forgotPasswordApi = async (
  payload: IForgotPasswordPayload
): Promise<{ message: string }> => {
  const { data } = await backendInstance.post("auth/forgot-password", payload);
  return data;
};

export const logoutUserApi = async (): Promise<{ message: string }> => {
  const { data } = await backendInstance.post("/auth/logout");
  delete backendInstance.defaults.headers["Authorization"];
  return data;
};
