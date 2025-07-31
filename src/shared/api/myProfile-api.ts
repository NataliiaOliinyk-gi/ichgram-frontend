import backendInstance from "./instance";
import type { IUser } from "../../typescript/interfaces";

export interface IUpdateMyProfilePayload {
 
  username: string;
  biography: string;
  profilePhoto: string;
}

export const getMyProfileApi = async (): Promise<IUser> => {
  const { data } = await backendInstance.get("/me");
  return data;
};

export const updateMyProfileApi = async (payload: IUpdateMyProfilePayload): Promise<IUser> => {
  const { data } = await backendInstance.put("/me", payload);
  return data;
};
