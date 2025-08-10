import backendInstance from "./instance";

import type { IToggleLike } from "../../typescript/interfaces";

export const toggleLikeApi = async (postId: string): Promise<IToggleLike> => {
  const { data } = await backendInstance.post("/likes/toggle", { postId });
  return data;
};

