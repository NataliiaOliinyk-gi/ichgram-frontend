import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { toggleLike } from "./likes-thunks";

// Допомога: створити елемент, якщо його ще немає
const ensureItem = (
  store: ILikesState,
  postId: string,
  seed?: Partial<ILikeItem>
) => {
  if (!store.byPostId[postId]) {
    store.byPostId[postId] = {
      isLiked: false,
      likesCount: 0,
      loading: false,
      error: null,
      ...seed,
    };
  }
};

export interface ILikeItem {
  isLiked: boolean;
  likesCount: number;
  loading: boolean;
  error: string | null;
}

export interface ILikesState {
  byPostId: {
    [postId: string]: ILikeItem;
  };
}
// це буде такого типу:
// byPostId: {
//     "post123": { isLiked: true, likesCount: 5, loading: false },
//     "post456": { isLiked: false, likesCount: 2, loading: true },
//   }

const initialState: ILikesState = {
  byPostId: {},
};

const likesSlice = createSlice({
  name: "likes",
  initialState: initialState,
  reducers: {
    // Засіяти зі списку постів
    seedFromFeed: (
      store,
      action: PayloadAction<
        Array<{
          _id: string;
          likesCount: number;
          isLikedByCurrentUser?: boolean;
        }>
      >
    ) => {
      action.payload.forEach(({ _id, likesCount, isLikedByCurrentUser }) => {
        ensureItem(store, _id); // якщо немає — створюємо
        store.byPostId[_id] = {
          isLiked: !!isLikedByCurrentUser, //швидкий спосіб перетворити значення в boolean.
          likesCount,
          loading: false,
          error: null,
        };
        // ensureItem(store, _id, {
        //   isLiked: !!isLikedByCurrentUser, 
        //   likesCount,
        //   loading: false,
        //   error: null,
        // });
      });
    },
    // Оптимістичний toggle до відповіді сервера
    toggleOptimistic: (store, action: PayloadAction<{ postId: string }>) => {
      const { postId } = action.payload;
      ensureItem(store, postId);
      const item = store.byPostId[postId];
      if (item.loading) return; // захист від подвійних кліків
      item.loading = true;
      item.error = null;
      // інвертуємо і коригуємо лічильник
      item.isLiked = !item.isLiked;
      item.likesCount += item.isLiked ? 1 : -1;
      if (item.likesCount < 0) item.likesCount = 0; // щоб не був з від'ємним значенням
    },
    // Ресет усього стану (при logout)
    resetLikes: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (store, action) => {
        const { postId } = action.meta.arg;
        ensureItem(store, postId);
        // НІЧОГО не робимо тут, бо ми вже оптимістично відреагували в toggleOptimistic
      })
      .addCase(toggleLike.fulfilled, (store, { payload }) => {
        const { postId, liked, likesCount } = payload;
        ensureItem(store, postId);
        const item = store.byPostId[postId];
        // синхронізуємо з сервером
        item.isLiked = liked;
        item.likesCount = likesCount;
        item.loading = false;
        item.error = null;
      })
      .addCase(toggleLike.rejected, (store, { payload, meta }) => {
        const postId = payload?.postId ?? meta.arg.postId;
        ensureItem(store, postId);
        const item = store.byPostId[postId];
        // відкат оптимістичного апдейту
        item.isLiked = !item.isLiked;
        item.likesCount += item.isLiked ? 1 : -1;
        if (item.likesCount < 0) item.likesCount = 0;

        item.loading = false;
        item.error = payload?.message ?? "Failed to toggle like";
      });
  },
});

export const { seedFromFeed, toggleOptimistic, resetLikes } =
  likesSlice.actions;

export default likesSlice.reducer;
