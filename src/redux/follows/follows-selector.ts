import type { RootState } from "../store";

export const selectFollowByUserId =
  (userId: string) => (store: RootState) => store.follows.byUserId[userId];