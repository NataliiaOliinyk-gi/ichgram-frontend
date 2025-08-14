import backendInstance from "./instance";
import type { IUser } from "../../typescript/interfaces";

export interface IGetUserByIdPayload {
  id: string;
}

export interface ISearchResultResponse {
  users: IUser[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export const getUserByIdApi = async (id: string): Promise<IUser> => {
  const { data } = await backendInstance.get(`/users/${id}`);
  return data;
};

export const searchUsersApi = async (
  q: string,
  page: number = 1,
  limit: number = 20
): Promise<ISearchResultResponse> => {
  const { data } = await backendInstance.get(`/users/search`, {
    params: { q, page, limit },
  });
  return data;
};

export const getUsersApi = async (): Promise<IUser[]> => {
  const { data } = await backendInstance.get(`/users/`);
  return data;
};
