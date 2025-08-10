import type { RootState } from "../store";

export const selectLikeByPostId = (postId: string) => (state: RootState) =>
  state.likes.byPostId[postId];
