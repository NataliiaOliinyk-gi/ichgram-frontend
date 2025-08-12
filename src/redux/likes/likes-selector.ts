import type { RootState } from "../store";

export const selectLikeByPostId = (postId: string) => (store: RootState) =>
  store.likes.byPostId[postId];
