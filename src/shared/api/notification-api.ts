import backendInstance from "./instance";

import type { INotification } from "../../typescript/interfaces";

export const getNotificationsApi = async (): Promise<INotification[]> => {
  const { data } = await backendInstance.get("/notifications");
  return data;
};