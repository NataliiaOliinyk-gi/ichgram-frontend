import backendInstance from "./instance";
import type { IUser } from "../../typescript/interfaces";

export interface IUpdateMyProfilePayload {
  username?: string;
  fullName?: string;
  biography?: string;
  website?: string;
  profilePhoto?: File;
}

export const getMyProfileApi = async (): Promise<IUser> => {
  const { data } = await backendInstance.get("/me");
  return data;
};

export const updateMyProfileApi = async (
  payload: IUpdateMyProfilePayload
): Promise<IUser> => {
  const formData = new FormData();

  if (payload.username) formData.append("username", payload.username);
  if (payload.fullName) formData.append("fullName", payload.fullName);
  if (payload.biography !== undefined)
    formData.append("biography", payload.biography);
  if (payload.website !== undefined)
    formData.append("website", payload.website);
  if (payload.profilePhoto)
    formData.append("profilePhoto", payload.profilePhoto);

  const { data } = await backendInstance.put("/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// export const updateMyProfileApi = async (payload: IUpdateMyProfilePayload): Promise<IUser> => {
//   const { data } = await backendInstance.put("/me", payload);
//   return data;
// };
