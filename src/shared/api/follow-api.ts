import backendInstance from "./instance";

export interface IFollowStatusResponce {
  following: boolean;
  targetFollowersCount: number;
  meFollowingCount: number;
}

export const followUserApi = async (
  targetId: string
): Promise<IFollowStatusResponce> => {
  const { data } = await backendInstance.post(`/follow/${targetId}`);
  return data;
};

export const unfollowUserApi = async (
  targetId: string
): Promise<IFollowStatusResponce> => {
  const { data } = await backendInstance.delete(`/follow/${targetId}`);
  return data;
};
