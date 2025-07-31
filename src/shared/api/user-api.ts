import backendInstance from "./instance";
// import requestDecorator from "./requestDecorator";
import type { IUser } from "../../typescript/interfaces";

export interface IGetUserByIdPayload {
  id: string;
}

export const getUserByIdApi = async (id: string): Promise<IUser> => {
  const { data } = await backendInstance.get(`/users/${id}`);
  return data;
};

// export const getUserByIdApi = requestDecorator(
//   async (id: string): Promise<IUser> => {
//     const { data } = await backendInstance.get(`/users/${id}`);
//     return data;
//   }
// );

// export const getUsersAllApi = requestDecorator(async (params = {}) => {
//     const { data } = await backendInstance.get("/users/all", {
//         params: {
//             ...params,
//             limit: params.limit ?? 50,
//         },
//     });
//     return data;
// });
