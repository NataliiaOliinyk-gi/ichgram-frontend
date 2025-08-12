import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { followUser, unfollowUser } from "./follows-thunks";

export interface IFollowItem {
  isFollowing: boolean;
  followersCount: number;
  loading: boolean;
  error: string | null;
}

export interface IFollowState {
  byUserId: {
    [userId: string]: IFollowItem;
  };
}

const initialState: IFollowState = {
  byUserId: {},
};

const ensureItem = (
  store: IFollowState,
  userId: string,
  seed?: Partial<IFollowItem>
) => {
  if (!store.byUserId[userId]) {
    store.byUserId[userId] = {
      isFollowing: false,
      followersCount: 0,
      loading: false,
      error: null,
      ...seed,
    };
  } else if (seed) {
    // перезапис свіжими даними при "засіві"
    store.byUserId[userId] = { ...store.byUserId[userId], ...seed };
  }
};

const followsSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {
    seedUserFollowState: (
      store,
      action: PayloadAction<{
        userId: string;
        isFollowedByCurrentUser?: boolean;
        followersCount: number;
      }>
    ) => {
      const { userId, isFollowedByCurrentUser, followersCount } =
        action.payload;
      ensureItem(store, userId, {
        isFollowing: !!isFollowedByCurrentUser,
        followersCount,
        loading: false,
        error: null,
      });
    },
    resetFollows: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // follow
      .addCase(followUser.pending, (store, { meta }) => {
        const userId = meta.arg.targetId;
        ensureItem(store, userId);
        store.byUserId[userId].loading = true;
        store.byUserId[userId].error = null;
      })
      .addCase(followUser.fulfilled, (store, { payload, meta }) => {
        const userId = meta.arg.targetId;
        ensureItem(store, userId);
        store.byUserId[userId].isFollowing = payload.following;
        store.byUserId[userId].followersCount = payload.targetFollowersCount;
        store.byUserId[userId].loading = false;
        store.byUserId[userId].error = null;
      })
      .addCase(followUser.rejected, (store, { payload, meta }) => {
        const userId = meta.arg.targetId;
        ensureItem(store, userId);
        store.byUserId[userId].loading = false;
        store.byUserId[userId].error = payload ?? "Failed to follow";
      })
      // unfollow
      .addCase(unfollowUser.pending, (store, { meta }) => {
        const userId = meta.arg.targetId;
        ensureItem(store, userId);
        store.byUserId[userId].loading = true;
        store.byUserId[userId].error = null;
      })
      .addCase(unfollowUser.fulfilled, (store, { payload, meta }) => {
        const userId = meta.arg.targetId;
        ensureItem(store, userId);
        store.byUserId[userId].isFollowing = payload.following;
        store.byUserId[userId].followersCount = payload.targetFollowersCount;
        store.byUserId[userId].loading = false;
        store.byUserId[userId].error = null;
      })
      .addCase(unfollowUser.rejected, (store, { payload, meta }) => {
        const userId = meta.arg.targetId;
        ensureItem(store, userId);
        store.byUserId[userId].loading = false;
        store.byUserId[userId].error = payload ?? "Failed to follow";
      });
  },
});

export const { seedUserFollowState, resetFollows } = followsSlice.actions;

export default followsSlice.reducer;
