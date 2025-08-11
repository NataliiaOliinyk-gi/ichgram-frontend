import backendInstance from "./instance";

import type { IComment } from "../../typescript/interfaces";

export interface IAddCommentPayload {
  text: string;
}

export interface IUpdateCommentPayload {
  text: string;
}

export interface ICommentResponce {
  comments: IComment[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export const addCommentApi = async (
  postId: string,
  payload: IAddCommentPayload
): Promise<IComment> => {
  const { data } = await backendInstance.post(
    `/comments/post/${postId}`,
    payload
  );
  return data;
};

export const getCommentsByPostIdApi = async (
  postId: string,
  page: number,
  limit: number = 10
): Promise<ICommentResponce> => {
  const { data } = await backendInstance.get(`/comments/post/${postId}`, {
    params: { page, limit },
  });
  return data;
};

export const updateCommentByIdApi = async (
  id: string,
  payload: IUpdateCommentPayload
): Promise<IComment> => {
  const { data } = await backendInstance.put(`/comments/${id}`, payload);
  return data;
};

export const deleteCommentByIdApi = async (id: string): Promise<IComment> => {
  const { data } = await backendInstance.delete(`/comments/${id}`);
  return data;
};
