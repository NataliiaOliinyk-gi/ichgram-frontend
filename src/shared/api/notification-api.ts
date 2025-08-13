import backendInstance from "./instance";

import type { INotification } from "../../typescript/interfaces";

export interface IGetNotificationsResponse {
  notifications: INotification[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export const getNotificationsApi = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetNotificationsResponse> => {
  const { data } = await backendInstance.get("/notifications", {
    params: { page, limit },
  });
  return data;
};
