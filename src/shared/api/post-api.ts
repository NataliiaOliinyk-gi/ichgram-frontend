import backendInstance from "./instance";

import type { IPost } from "../../typescript/interfaces";

export interface IAddPostPayload {
  text: string;
  photo: File | null;
}

export interface IUpdatePostFormData {
  text: string;
  photo: File | null;
}

export const addPostApi = async (payload: IAddPostPayload): Promise<IPost> => {
  const formData = new FormData();

  if (payload.text) formData.append("text", payload.text);
  if (payload.photo) formData.append("photo", payload.photo);

  const { data } = await backendInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getMyPostsApi = async (): Promise<IPost[]> => {
  const { data } = await backendInstance.get("/posts/my");
  return data;
};

export const updatePostApi = async (
  id: string,
  payload: IUpdatePostFormData
): Promise<IPost> => {
  const formData = new FormData();

  if (payload.text) formData.append("text", payload.text);
  if (payload.photo) formData.append("photo", payload.photo);

  const { data } = await backendInstance.put(`/posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deletePostApi = async (id: string): Promise<IPost> => {
  const { data } = await backendInstance.delete(`/posts/${id}`);
  return data;
};

export const getPostsApi = async (): Promise<IPost[]> => {
  const { data } = await backendInstance.get("/posts");
  return data;
};

export const getPostsByUserApi = async (id: string): Promise<IPost[]> => {
  const { data } = await backendInstance.get(`/posts/user/${id}`);
  return data;
};
